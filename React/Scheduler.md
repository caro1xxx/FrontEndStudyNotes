>  Scheduler主要功能是时间分片,每隔一段时间就将**主线程控制权还给浏览器**(messageChannel),避免长时间占用主线程

#### 更新流程

1. React组件状态更新,向scheduler中存入一个任务
2. scheduler调度该任务,执行React更新算法
3. React在调和阶段更新一个fiber后,会询问scheduler是否暂停,如果不需要暂停那么重复当前步骤,询问下一个fiber
4. 如果需要暂停,那么React将返回一个函数,该函数告诉scheduler任务还没有完成,Scheduler 将在未来某时刻调度该任务

#### 为什么选择了messageChannel而不是setTimeout

> 首先,react会判断当前环境是否支持messageChannel,如果不支持,那么还是会使用setTimeout

* MessageChannel 的作用

  * 生成浏览器EventLoop中的一个宏任务,已达到将主线程控制权还给浏览器的目的,使浏览器能够更新页面

  * 浏览器更新页面后能够继续执行scheduler中未完成的任务

  * 不用微任务迭代原因是，微任务将在页面更新前全部执行完，达不到将主线程还给浏览器的目的

* 不首选setTimeout的原因是:setTimeout(fn,0)就算指定超时0ms,也不会0ms,**至少有4ms**,setInterval同理
* 并且messageChannel总是在setTimeout之前执行

#### 不选择requestIdelCallback的原因

> react在**15.x**的时候尝试使用requestIdelCallback,但是后面遇到了兼容性,以及不同浏览器和机器的**执行效率问题**,所以**requestIdelCallback被requestAnimationFrame+setTimeout的polyfill方法替代了**

#### 不选择 requestAnimationFrame 的原因

>在 React **16.10.0 之前**还是使用的 requestAnimationFrame + setTimeout 的方法，配合动态帧计算的逻辑来处理任务，后来也因为这样的**效果并不理想**，所以 React 团队才决定彻底放弃此方法

> requestAnimationFrame 还有个特点，就是**当页面处理未激活的状态下**，requestAnimationFrame **会停止执行**；**当页面后面再转为激活时**，requestAnimationFrame **又会接着上次的地方继续执行。**

#### 为什么不用 Generator、Webworkers 来做任务调度

> 针对Generator,react其实尝试过
>
> Generator不能在栈中间让出,比如在一个嵌套函数中让出,那么必须要让所有函数这包装为Generator,这不仅是语法上的开销,现有的生成器实现开销比较大，所以不如不用

> 针对 Webworkers ， React 团队同样做过一些分析和讨论

#### 为什么在scheduler中需要将高优先级转为普通优先级

> 因为 Scheduler 本质可以和 React **分离**，在 Scheduler 中**也有其自己的任务优先级定义**，而 React 中也**利用 Lanes 的优先级模型**，**所以 React 在使用 Scheduler 的任务调度时，需要有一个任务优先级的转换过程**

