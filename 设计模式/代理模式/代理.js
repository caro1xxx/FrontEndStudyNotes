非代理:直接通过自己处理事情
代理:自己去找另外一个代理,让代理来帮自己完成
    ** 这个代理可以监听事情什么时候需要处理 **

简单实现:
  // 事情
  function Task(){}

  // 自己
  let A = {
    sendhandle:function(target){
      let task = new Task();
      target.handle(task);
    }
  }

  // 代理对象
  let b= {
    handle:function(task){
      c.handle(task);
    }
  }

  // 最终
  let c = {
    handle:function(task){
      console.log('do'+task);
    }
  }

/* 
  上面的例子只是简单实现代理模式,可以看出并且没有什么太大的用处
  但是代理对象可以监听事情何时需要处理
*/
// 简单实现
  // 事情
  function Task(){}

  // 自己
  let A = {
    sendhandle:function(target){
      let task = new Task();
      target.handle(task);
    }
  }

  // 代理对象
  let b= {
    handle:function(task){
      // 监听c事情什么时候需要被处理
      // listenHandle参数是个函数
      c.listenHandle(()=>{
        c.handle(task);
      })
    }
  }

  // 最终
  let c = {
    handle:function(task){
      console.log('do'+task);
    },
    listenHandle:function(fn){
      // 假设3秒钟之后需要被处理
      setTimeout(()=>{
        fn();
      },3000)
    }
  }