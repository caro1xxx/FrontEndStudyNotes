// 我们可以利用js的函数式特性,有一种更加方便的方法来创建责任链
// AOP类似链式调用
/* 
  新增Function.prototype.after函数，使得第一个函数返回'nextSuccessor' 
时，将请求继续传递给下一个函数，无论是返回字符串'nextSuccessor'或者 false 都只是一个约
定，当然在这里我们也可以让函数返回 false 表示传递请求，选择'nextSuccessor'字符串是因为
它看起来更能表达我们的目的
*/

Function.prototype.after = function (fn){
  let self= this;
  return function(){
    let ret = self.apply(this,arguments);
    if(ret === 'nextSuccessor'){
      return fn.apply(this,arguments)
    }
  }
}


//AOP
var order = order500yuan.after( order200yuan ).after( orderNormal ); 

order( 1, true, 500 );    // 输出：500元定金预购，得到 100优惠券
order( 2, true, 500 );    // 输出：200元定金预购，得到 50 优惠券
order( 1, false, 500 );   // 输出：普通购买，无优惠券