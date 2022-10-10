// 因为js没有类型检测,并且是通过原型继承的方法实现抽象
// 如果在子类没有正确重写父类中的方法时,那么我们就不会得到想要的东西
// 所以这里给出了解决方案
// 在父类中需要被重写的方法中抛出错误,如果子类没有重写这个方法,那么就会抛出错误

let Make = function (){};

Make.prototype.water = function(){
    console.log('烧水');
}

Make.prototype.push = function(){
    throw new Error('子类必须被重写')
}

Make.prototype.seasoning = function(){
    throw new Error('子类必须被重写')
}

Make.prototype.init = function(){
    this.water();
    this.push();
    this.seasoning();
}

// 这样一来就解决了问题,在没有完全重新个方法时就会错误,重写了方法就会覆盖父类的方法不会出现错误