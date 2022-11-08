先说说问题,原生的这个方法具有缺陷

* 实现Api,兼容一般
* RequestIdelCallback FPS只有20ms,并没有达到16.67ms
* RequestIdelCallback的定位是*不重要且不紧急的任务*

这些问题就导致了React团队自行实现了RequestIdelCallback

##### 原生RequestIdleCallback

语法

```js
window.requestIdelCallback(callback,[options])
```

```ts
type DeadLine = {
	timeRemaining:() => number  //当前剩余的可用时间,即该帧的剩余时间
  didTimeout:boolean //是否超时
}

type RequestIdleCallback = (callback:(deadline:DeadLine) => void ,options?: Options) => number
```

实现原生RequestIdleCallback

```js
//触发工作
const handler = (id) => {
  element(id).addEventListener('click',Work.onAsyncUnit);
}


let Work = {
  unit:10000, //任务
  onOneUnit:() => {} //处理单个任务
  
  //处理任务
  onAsyncUnit:()=>{
    const FREETIME = 1 //判断空闲时间的基准1ms
    let currentUnit = 0 //执行到了第几个任务
    
    function callback (deadline){
      //当前任务没有处理完 && 当前剩余时间 大于 空闲时间基准
			while(currentUnit < Work.unit && deadline.timeRameining() > FREETIME){
        //继续处理单个任务
				Work.onOneUnit();
        currentUnit++;
      }
      //如果执行到这里,说明任务处理完了
      if(currentUnit >= Work.unit){
        return;
      }else{
				//任务没有干完,继续等待
      	window.requestIdleCallback(callback)
      }
    }
    window.requestIdleCallback(callback)
  }
}
```

> *核心逻辑就是判断是否还有任务和当前时间是否大于空闲时间基准*
>
> 内部还是去处理单个任务去了

```ts
while(currentUnit < Work.unit && deadline.timeRameining() > FREETIME){
  //继续处理单个任务
  Work.onOneUnit();
  currentUnit++;
}
```

##### React RequestIdleCallback

根据上面的实现我们知道了,需要解决2个问题

* 如何判断一帧是否空闲?  ---> `requestAnimationFrame`
* 如果空闲了,在一帧中哪里去执行任务   ---> `MessageChannel 宏任务 执行任务`

###### requestAnimationFrame

> 定义: 由*系统决定回调函数的执行时间*,它会把*每一帧*中的*所有DOM操作集中*起来,*在一次重绘会回流中完成*,并且重绘或回流的*时间间隔跟随屏幕刷新率*,意味着不会引起丢帧

```ts
type RequestAnimationFrame = (callback:(rafTime:number) => void)

//rafTime: 即开始执行一帧的开始时间
```

using

```js
let deadlineTime;
ReactRequestIdleCallback = function(callback) {
	requestAnimationFrame(rafTime => {
    // 结束时间 = 开始时间 + 一帧用时16.667ms
    deadlineTime = rafTime + 16.667
    ...
  })
}
```

###### MessageChannel

> 定义:MessageChannel创建*一个通信的管道*,这个管道*有两个端口*,每个端口都可以通过*postMessage发送数据*,而一个端口只要绑定了*onmessage*回调,就可以接收从另一个端口发来的数据

* but,为什么使用宏任务处理?

Becuse,核心任务是将控制权让出,让浏览器去更新页面

利用*事件循环机制*,在*下一帧宏任务的时候*,*执行未完成的任务,执行完毕后,在宏任务这里让出控制权*

* 为什么不用微任务?

*在页面更新前,会将所有微任务执行完,微任务都执行完了,还怎么让出控制权?*

* 为什么不用setTimeout宏任务

如果不支持MessageChannel的话,就会用setTimeout来执行

实际情况是,在使用setTimeout时不传入延时和传入延时0,都会有4ms的延时

*所有用MessageChannel模拟SetTimeout(fn,0),还没有延时*

实现

```js
let deadlineTime
let callback
let channel = new MessageChannel()
let port1 = channel1.port1;
let port2 = channel2.port2

//端口2 监听来之端口1的消息
port2.onmessage = () => {
  const timeRamaining = () => deadlineTime - performance.now();
  const _timeRemain = timeRamaining();
  //有空闲时间 && 有回调任务
  if(_timeRemain > 0 && callback){
    const deadline  = {
			timeRemaining,//计算剩余时间
      //如果_timeRemain > 0,说明提前完成了任务,如果 < 0说明没有完成
      didTimeour:_timeRemain < 0; //当前帧是否完成
    }
    callback(deadline) //执行回调
  }
}


window.requestIdleCallback = function (cb) {
    requestAnimationFrame(rafTime => {
        // 结束时间点 = 开始时间点 + 一帧用时16.667ms
        deadlineTime = rafTime + 16.667
        // 保存任务
        callback = cb
        // 发送个宏任务
        port1.postMessage(null);
    })
}
```

##### RequestHostCallback源码

```js
  let scheduledHostCallback = null;
  let isMessageLoopRunning = false;
  const channel = new MessageChannel();
  // port2 发送
  const port = channel.port2;
  // port1 接收
  channel.port1.onmessage = performWorkUntilDeadline;
  const performWorkUntilDeadline = () => {
    // 有执行任务
    if (scheduledHostCallback !== null) {
      const currentTime = getCurrentTime();
      // Yield after `yieldInterval` ms, regardless of where we are in the vsync
      // cycle. This means there's always time remaining at the beginning of
      // the message event.
      // 计算一帧的过期时间点
      deadline = currentTime + yieldInterval;
      const hasTimeRemaining = true;
      try {
        // 执行完该回调后, 判断后续是否还有其他任务
        const hasMoreWork = scheduledHostCallback(
          hasTimeRemaining,
          currentTime,
        );
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          // If there's more work, schedule the next message event at the end
          // of the preceding one.
          // 还有其他任务, 推进进入下一个宏任务队列中
          port.postMessage(null);
        }
      } catch (error) {
        // If a scheduler task throws, exit the current browser task so the
        // error can be observed.
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    }
    // Yielding to the browser will give it a chance to paint, so we can
    // reset this.
    needsPaint = false;
  };
  // requestHostCallback 一帧中执行任务
  requestHostCallback = function(callback) {
    // 回调注册
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      // 进入宏任务队列
      port.postMessage(null);
    }
  };
  cacelHostCallback = function() {
    scheduledHostCallback = null;
  };
```

