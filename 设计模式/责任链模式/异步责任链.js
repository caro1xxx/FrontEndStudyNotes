// 在改进得例子中使用nextSuccessor来判断是否传入下一个节点
// 但是在异步中这个nextSuccessor就不起作用了
// 所以我们需要给链条增加一个方法 => next 用于手动调用进入下一个节点


Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

// 例子
var fn2 = new Chain(function () {
  console.log(2);
  var self = this;
  setTimeout(function () {
    self.next(); //手动调用
  }, 1000);
}); 