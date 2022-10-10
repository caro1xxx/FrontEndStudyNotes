#### 介绍

> 不同于web worker,service worker,不仅是一个worker,并且能操作缓存,能够拦截请求数据

> 缓存,如果在网络离线的状态下,我们就可以操作service worker缓存之前的数据,然后等到网络离线的时候用,并且也可以在存在缓存的情况下使用网络请求的数据

> 表示自身也是`self`

* 能够使用缓存
* 可以编程式的操作是否使用缓存
* 可以缓存静态资源
* 需要主线注册
* 一旦注册缓存永久存在,除非手动Unregister
* 必须https下或者localhost下才能使用(安全考虑)
* 异步实现,内部全是promise实现的
* 用到的时候可以唤醒,不用的时候可以休眠

#### 语法

```js
//index.js
//尽量在load时间中注册sw,避免首次加载和其他操作抢占资源
window.addEventListener('load',()=>{
  //特性检测
	if('r' in navigator){
    navigator.serviceWorker.register('./sw.js')
    	.then(res=>{
      console.log(res)
    })
  }
})
```

```js
//sw.js
console.log('1111')
```

#### 生命周期

* install:在service worker注册成功时触发,常用于缓存资源

  * 触发逻辑:
    * **首次加载**时会触发
    * 或者**sercive worker文件发生变化**时会触发

* activate:在service worker激活成功时触发,常用于**删除旧的**换成资源

  * 触发逻辑:

    * **首次install触发后会触发**

    * 或者service worker文件发生变化后,install被触发后,**等待之前旧的service worker停止执行后触发**

      * **跳过等待**:`self.skipWaiting()`,直接触发,返回promise,一般放在install监听事件中

        * ```js
          self.addEventListener('install',()=>{
            ....
            self.skipWaiting()
          })
          ```

      * 因为skipWaiting返回的时候promise,属于异步操作,那么就有可能出现还没等skipWating执行完就出发其他生命周期了

        * 使用`event.waitUntil()`:接收一个promise,作用:等待promise真正执行完

          * ```js
            self.addEventListener('install',()=>{
              ....
              event.waitUntil(self.skipWaiting())
            })
            ```

* fetch:在发生请求的时候触发,常用于操作缓存或请求网络资源(**所有网络请求**)

  * 触发逻辑:
    * **只要有网络请求就会触发**

##### 注意

> service worker**激活**成功后,**会在下一次刷新页面时生效**
>
> 所以我们需要使用`self.clients.claim()`:**立即获得控制权,不必等到下次刷新**

```js
self.addEventListener('activate',()=>{
  ....
 	event.waitUntil(self.clients.claim())
})
```

##### 最终

```js
self.addEventListener('install',()=>{
  ....
  self.skipWaiting()
})

self.addEventListener('activate',()=>{
  ....
 	event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch',()=>{
  ....
})
```

#### 网络请求

> 注意:如果需要在web worker中发生网络请求,那么只能用fetch,因为没有web worker没有DOMBOM不发使用xhr

> 但是在pwa项目中还是在主线程发生请求的多,所以还是xhr