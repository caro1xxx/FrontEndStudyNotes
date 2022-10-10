// 因为父类中抽象的方法和init内子类方法执行顺序是最开始抽象出来的,
// 如果有一些特殊的子类,它并不是按照这个执行顺序或有些独特的方法
// 那么我们继续使用到钩子方法(hook)用来解决这个问题,防止钩子是隔离变化的一种常见
// 手段,我们在父类中容易的地方放置钩子,钩子可以有一个默认的实现,究竟要不要挂钩子,这个由子类自行决定
// 钩子方法的返回结果也决定了模板方法后面部分的执行步骤,也就是程序接下来的走向,这样以来,程序就拥有了变化的过程


// 实现
// 定义一个makeHooks钩子,用来判断是否放佐料

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

Make.prototype.makeHooks = function (){
    return true; //默认需要佐料
}

Make.prototype.init = function(){
    this.water();
    this.push();
    // 如果钩子返回ture,就放佐料
    if(this.makeHooks()){
        this.seasoning();
    }
    this.seasoning(); 
}


// 子类
let MakeCoffer = function (){}

MakeCoffer.prototype = new Make();

MakeCoffer.prototype.push = function (){
    console.log('泡咖啡')
}

MakeCoffer.prototype.seasoning = function (){
    console.log('放入糖')
}

// 重写钩子,并请求结果
MakeCoffer.prototype.makeHooks = function (){
    return window.alert('是否需要佐料')
}

let c = new MakeCoffer();
c.init();