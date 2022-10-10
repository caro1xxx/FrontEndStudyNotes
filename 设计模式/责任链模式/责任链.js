/* 
  职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间
的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
*/

/* 
  职责链模式的名字非常形象，一系列可能会处理请求的对象被连接成一条链，请求在这些对 
象之间依次传递，直到遇到一个可以处理它的对象，我们把这些对象称为链中的节点
*/


// 简单实现  此实现违反开放-封闭原则


// 500元订单
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购, 得到 100优惠券');
  } else {
    // 将请求传递给 200元订单   
    order200(orderType, pay, stock);
  }
};
// 200元订单
var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购, 得到 50 优惠券');
  } else {
    // 将请求传递给普通订单 
    orderNormal(orderType, pay, stock);
  }
};
// 普通购买订单
var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买, 无优惠券');
  } else {
    console.log('手机库存不足');
  }
};
// 测试结果：
order500(1, true, 500);    // 输出：500元定金预购, 得到 100优惠券
order500(1, false, 500);   // 输出：普通购买, 无优惠券
order500(2, true, 500);    // 输出：200元定金预购, 得到 500优惠券
order500(3, false, 500);   // 输出：普通购买, 无优惠券
order500(3, false, 0);     // 输出：手机库存不足