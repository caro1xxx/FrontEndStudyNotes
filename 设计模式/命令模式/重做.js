// 当我们下象棋时有悔棋的选项,可以悔几步
/* 
  但是一旦我们需要悔棋很多步时,显然靠撤销是无法满足的,所以我们需要重做
  把场景重置,然后对对应的操作进行重绘

  利用这一特性就相当于实现回放操作
*/

// 以上操作均可基于缓存实现