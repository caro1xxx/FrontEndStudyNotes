/* 
  缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参 
数跟之前一致，则可以直接返回前面存储的运算结果
*/
var mult = function(){ 
  console.log( '开始计算乘积' ); 
  var a = 1; 
  for ( var i = 0, l = arguments.length; i < l; i++ ){ 
      a = a * arguments[i];  
  }  
  return a; 
};
mult( 2, 3 );    // 输出：6 
mult( 2, 3, 4 );    // 输出：24

// 现在加入缓存代理函数：
var proxyMult = (function(){ 
  var cache = {}; 
  return function(){ 
      var args = Array.prototype.join.call( arguments, ',' ); 
      if ( args in cache ){ 
          return cache[ args ]; 
      } 
      return cache[ args ] = mult.apply( this, arguments ); 
  } 
})(); 
proxyMult( 1, 2, 3, 4 );    // 输出：24 
proxyMult( 1, 2, 3, 4 );    // 输出：24
// 当我们第二次调用 proxyMult( 1, 2, 3, 4 )的时候，本体 mult函数并没有被计算，proxyMult 
// 直接返回了之前缓存好的计算结果。
// 通过增加缓存代理的方式，mult函数可以继续专注于自身的职责——计算乘积，缓存的功能 
// 是由代理对象实现的