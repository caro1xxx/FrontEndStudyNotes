// 装饰器模式可以动态地给某个对象添加一些额外的职责,而不影响从这个类中派生的其他对象
// 其实就是：通过保存原引用的方式就可以改写某个函数

// 简单实现

var plane = {
  fire: function () {
    console.log('发射普通子弹');
  }
}

var missileDecorator = function () {
  console.log('发射导弹');
}

var atomDecorator = function () {
  console.log('发射原子弹');
}


var fire1 = plane.fire;  //console.log('发射普通子弹');
plane.fire = function () {
  fire1();
  missileDecorator();
}
/* 
  此时fire内有
    console.log('发射普通子弹');
    console.log('发射导弹');
*/


var fire2 = plane.fire; //console.log('发射普通子弹');console.log('发射导弹');
plane.fire = function () {
  fire2();
  atomDecorator();
}
/* 
  此时fire内有
    console.log('发射普通子弹');
    console.log('发射导弹');
    console.log('发射原子弹');
*/



// 最后执行fire的内容
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹