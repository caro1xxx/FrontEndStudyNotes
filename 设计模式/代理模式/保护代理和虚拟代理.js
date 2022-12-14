/* 
  这个代理对象b可以帮助事情c过滤一些不是处理请求的请求
  只在指定请求才会告知c,这就是**代理保护**
*/
/* 
  **虚拟代理**,有可能这个task是非常耗时或者很大的操作,
  那么我们可以把创建task的操作交给代理对象b,在c需要被处理时
  才被创建,这就是虚拟代理,这个虚拟代理把很大的开销的操作,延迟到
  真正需要的时候才被创建
*/

// 代理对象
let b= {
  handle:function(task){
    // 监听c事情什么时候需要被处理
    c.listenHandle(()=>{
      let task = new Task(); //延迟创建task对象
      c.handle(task);
    })
  }
}