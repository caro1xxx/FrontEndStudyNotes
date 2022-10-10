// 因为先前的实现违反了开放-封闭原则,并且如果需求需要改变,那么这个链条将会被打断
// 所以我们需要优化一下
// 即便在后续需求改变后也不会打断整个链条


var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到 100优惠券');
  } else {
    // 我不知道下一个节点是谁，反正把请求往后面传递   
    return 'nextSuccessor';
  }
};
var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到 50 优惠券');
  } else {
    // 我不知道下一个节点是谁，反正把请求往后面传递 
    return 'nextSuccessor';
  }
};
var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
};



// Chain.prototype.setNextSuccessor  指定在链中的下一个节点 
// Chain.prototype.passRequest  传递请求给某个节点

// 定义这个链条
var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};
// setNextSuccessor用于添加链条方法
Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;
};

// passRequest用于执行
Chain.prototype.passRequest = function () {
  // 如果这个方法是被setNextSuccessor添加到了successor的
  var ret = this.fn.apply(this, arguments);
  if (ret === 'nextSuccessor') {
    // 判断这个链条方法存在 并且 对这个方法apply()
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  // 如果不存在就直接返回
  return ret;
};

// 包装3个订单方法
var chainOrder500 = new Chain( order500 ); 
var chainOrder200 = new Chain( order200 ); 
var chainOrderNormal = new Chain( orderNormal ); 


//指定在链中的顺序
chainOrder500.setNextSuccessor( chainOrder200 ); 
chainOrder200.setNextSuccessor( chainOrderNormal );

// 把请求传入第一个节点
chainOrder500.passRequest( 1, true, 500 );    // 输出：500 元定金预购，得到 100优惠券
chainOrder500.passRequest( 2, true, 500 );    // 输出：200 元定金预购，得到 50优惠券
chainOrder500.passRequest( 3, true, 500 );    // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 );     // 输出：手机库存不足