// 模板方法：由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类
// 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序
// 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法

// 我们在vue中封装的axios就是这种模式

// 简单实现

// 首先我们把泡咖啡和泡茶的父类抽象出来
// 泡咖啡和泡茶都需要烧水
// 然后放入咖啡和茶
// 最后是放入佐料
// 那么它们共同都需要烧水这个动作,然后放入的东西不同,放入的佐料也不同

let Make = function (){};

Make.prototype.water = function(){
    console.log('烧水');
}

Make.prototype.push = function(){}

Make.prototype.seasoning = function(){}

Make.prototype.init = function(){
    this.water();
    this.push();
    this.seasoning();
}
// 以上就是抽象出来的父类

// 根据泡什么来定义子类继承自父类,重写父类的某些方法
let MakeCoffer = function (){}

MakeCoffer.prototype = new Make();

MakeCoffer.prototype.push = function (){
    console.log('泡咖啡')
}

MakeCoffer.prototype.seasoning = function (){
    console.log('放入糖')
}

let c = new MakeCoffer();
c.init();
// 因为MakeCoffer没有init方法那么就会去原型链找init

// ** 在父类中的init方法就是模板方法,定义了子类执行顺序 **
// 相应的泡茶也是同理