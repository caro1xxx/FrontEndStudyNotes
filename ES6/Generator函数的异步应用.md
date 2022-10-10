#### 传统方式

> ES6 诞生**以前**，**异步编程**的方法，大概有**下面四种**
>
> * 回调函数
> * 事件监听
> * 发布/订阅
> * Promise 对象
>
> **Generator 函数**将 JavaScript **异步编程**带入了一个**全新的阶段**

#### 基本概念

##### 异步

> 所谓**"异步**"，简单说就是**一个任务不是连续完成的**，可以理解成**该任务被人为分成两段，先执行第一段**，**然后转而执行其他任务**，**等做好了**准备，**再回过头**执行第二段

> 比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步

> 相应地，**连续的执行就叫做同步**。**由于是连续执**行，**不能插入其他任**务，所以操作系统从硬盘读取文件的这段时间，程序**只能干等着**

##### 回调函数

> JavaScript 语言对异步编程的实现，就是**回调函数**。所谓回调函数，就是**把任务的第二段单独写在一个函数里面**，等到重新执行这个任务的时候，就**直接调用这个函数**。回调函数的英语名字`callback`，**直译过来就是"重新调用"**

> 读取文件进行处理，是这样写的

```javascript
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

> 上面代码中，`readFile`函数的**第三个参数**，**就是回调函数**，也就是任务的**第二段**。等到操作系统返回了`/etc/passwd`这个文件以后，**回调函数才会执行**

> 一个有趣的问题是，为什么 Node 约定，回调函数的**第一个参数，必须是错误对象**`err`（如果没有错误，该参数就是`null`）？
>
> **原因**是**执行分成两段**，第一段执行完以后，**任务所**在的上下文环境就已经结束了。在这以后**抛出的错误**，**原来**的上下文环境已经无法捕捉，**只能**当作参数，**传入第二段**

##### Promise

> 回调函数**本身并没有问题**，它的问题**出现在多个回调函数嵌套**。假定读取`A`文件之后，再读取`B`文件，代码如下

```javascript
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});
```

> 不难想象，如果依次**读取两个以上的文件**，就会出现多重嵌套。代码**不是纵向发展，而是横向发展**，很快就会乱成一团，无法管理。因为多个异步操作形成了**强耦合**，只要有一个操作需要修改，它的上层回调函数和下层回调函数，可能都要跟着修改。这种情况就**称为"回调函数地狱"（callback hell）**

> Promise 对象就是**为了解决这个问题而提出的**。它**不是新的语法功能**，而是一种**新的写法**，允许将回调**函数的嵌套**，改成**链式调用**。采用 Promise，连续读取多个文件，写法如下

```javascript
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
//上面代码中，我使用了fs-readfile-promise模块，它的作用就是返回一个 Promise 版本的readFile函数。Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误
```

> 可以看到，Promise 的写法**只是回调函数的改进**，使用`then`方法**以后**，异步任务的**两段执行看得更清楚了**，**除此以外，并无新意**

> Promise 的**最大问题是代码冗余**，**原来**的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆`then`，原来的**语义变得很不清楚**

#### Generator函数

##### 协程

> 传统的编程语言，早有**异步编程的解决方案**（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是**多个线程互相协作，完成异步任务**

> **协程有点像函数，又有点像线程**。它的运行流程大致如下
>
> - 第一步，协程`A`开始执行。
> - 第二步，协程`A`执行到一半，进入暂停，执行权转移到协程`B`。
> - 第三步，（一段时间后）协程`B`交还执行权。
> - 第四步，协程`A`恢复执行。

> 上面流程的协程`A`，就是**异步任务，因为它分成两段（或多段）执行**

> 举例来说，读取文件的协程写法如下

```javascript
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
//上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线
```

> 协程**遇到`yield`命令就暂停**，**等到**执行权返回，**再从暂停**的地方继续往后执行。它的**最大优点**，就是**代码的写法非常像同步操作**，如果去除`yield`命令，简直一模一样

##### 协程 Generator函数实现

> Generator 函数是协程在 ES6 的实现，**最大特点**就是**可以交出函数的执行权（即暂停执行）**

> 整个 Generator 函数**就是一个封装的异步任务**，**或者说是异步任务的容器**。异步操作**需要暂停的地方**，都用`yield`语句**注明**。Generator 函数的执行方法如下

```javascript
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

> 上面代码中，调用 Generator 函数，会**返回一个内部指针（即遍历器）**`g`。这是 Generator 函数不同于普通函数的另一个地方，即**执行它不会返回结果，返回的是指针对象**。**调用指针**`g`的`next`方法，会**移动内部指针**（即执行异步任务的第一段），**指向第一个遇到的**`yield`语句，上例是**执行到`x + 2`为止**

> 换言之，`next`方法的作用是分阶段执行`Generator`函数。每次调用`next`方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。`value`属性是`yield`语句后面表达式的值，表示当前阶段的值；`done`属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段

##### Generator函数的数据交换和错误处理

> Generator 函数可以**暂停执行和恢复执行**，这是它能封装异步任务的根本原因。除此之外，它**还有两个特性**，使它可以**作为异步编程的完整解决方案**：**函数体内外**的**数据交换和错误处理机制**

> `next`返回**值的 value 属性**，是 Generator 函数**向外输出数据**；`next`方法还**可以接受参数**，向 Generator 函数**体内输入数据**

```javascript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
//上面代码中，第一个next方法的value属性，返回表达式x + 2的值3。第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。因此，这一步的value属性，返回的就是2（变量y的值）
```

> Generator 函数**内部**还可以**部署错误处理代码**，**捕获函数体外抛出的错误**

```javascript
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
//上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的
```

##### 异步任务的封装

> 下面看看如何使用 Generator 函数，执行一个真实的异步任务

```javascript
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
//上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令
```

> 执行这段代码的方法如下

```javascript
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
//上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法
```

> 可以看到，虽然 Generator 函数将异步操作表示**得很简洁**，**但是流程管理却不方便**（即何时执行第一阶段、何时执行第二阶段）

#### Thunk函数

> Thunk 函数是**自动执行 Generator 函数的一种方法**

##### 参数的求值策略

> Thunk 函数早在上个世纪 60 年代就诞生了

> 那时，编程语言**刚刚起步**，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是"**求值策略"**，即函数的参数到底应该何时求值

```javascript
var x = 1;

function f(m) {
  return m * 2;
}

f(x + 5)
//上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值?
```

> 一种意见是**"传值调用"**（**call by value**），即在**进入函数体之前**，**就计算**`x + 5`的**值**（等于 6），**再将这个值传入函数**`f`。**C 语言**就采用这种策略

```javascript
f(x + 5)
// 传值调用时，等同于
f(6)
```

> 另一种意见是“**传名调用**”（**call by name**），即**直接将表达式**`x + 5`**传入函数体**，**只在用到它的**时候求值。**Haskell 语言采用这种策略**

```javascript
f(x + 5)
// 传名调用时，等同于
(x + 5) * 2
```

> 传值调用和传名调用，哪一种比较好？
>
> 回答是**各有利弊**。**传值调用比较简单**，但是对参数求值的时候，**实际上还没用到**这个参数，有**可能造成性能损失**

```javascript
function f(a, b){
  return b;
}

f(3 * x * x - 2 * x - 1, x);
```

> 上面代码中，函数`f`的第一个参数是一个复杂的表达式，但是函数体内**根本没用到**。对这个参数求值，实际上**是不必要**的。**因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值**

##### Thunk函数的含义

> 编译器的“**传名调用**”实现，往往是将参数**放到一个临时函数之中**，**再将**这个临时函数**传入函数体**。这个**临时函数**就叫**做 Thunk 函数**

```javascript
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
//上面代码中，函数 f 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可
```

> 这就是 Thunk **函数的定义**，它是“传名调用”的一种**实现策略**，用来**替换某个表达式**

##### JavaScript语言的Thunk函数

> JavaScript 语言是**传值调用**，它的 Thunk 函数**含义有所不同**。在 JavaScript 语言中，Thunk 函数替换的**不是**表达式，**而是**多参数函数，**将其替换成一个只接受回调函数作为参数的单参数函数**

```javascript
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
//上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数
```

> **任何函数**，**只要参数有回调函数**，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器

```javascript
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```

> 使用上面的转换器，生成`fs.readFile`的 Thunk 函数

```javascript
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```

> 下面是另一个完整的例子

```javascript
function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);

ft(1)(console.log) // 1
```

##### Thunkify模块

> 生产环境的**转换器**，**建议使用** Thunkify 模块

> 首先是安装

```bash
$ npm install thunkify
```

> 使用方式如下

```javascript
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
```

> Thunkify 的源码与上一节那个简单的**转换器非常像**

```javascript
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

> 它的源码主要多了一个**检查机制**，变量`called`**确保回调函数只运行一次**。这样的设计与下文的 Generator 函数相关。请看下面的例子

```javascript
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
//上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果
```

##### Generator函数的流程管理

> 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的**自动流程管理**

> Generator 函数**可以自动执行**

```javascript
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
//上面代码中，Generator 函数gen会自动执行完所有步骤
```

> 但是，这**不适合异步操作**。如果**必须保证前一步执行完**，才能执行后一步，上面的**自动执行就不可行**。这时，**Thunk 函数就能派上用处**。以读取文件为例。下面的 Generator **函数封装了两个异步操作**

```javascript
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```

> 上面代码中，`yield`命令用**于将程序的执行权移出 Generator 函数，**那么就需要一种方法，**将执行权再交还给 Generator 函数**

> **这种方法**就是 Thunk 函数，因为它**可以在回调函数里**，将**执行权交还给 Generator 函数**。为了便于理解，我们先看如何手动执行上面这个 Generator 函数

```javascript
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
//上面代码中，变量g是 Generator 函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）
```

> 仔细查看上面的代码，可以发现 Generator 函数的执行过程，**其实是将同一个回调函数**，**反复**传入`next`方法的`value`属性。这使得我们可以**用递归来自动完成这个过程**

##### Thunk函数的自动流程管理

> Thunk 函数**真正**的威力，在于**可以自动执行 Generator 函数**。下面就是一个基于 Thunk 函数的 Generator 执行器

```javascript
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

function* g() {
  // ...
}

run(g);
//上面代码的run函数，就是一个 Generator 函数的自动执行器。内部的next函数就是 Thunk 的回调函数。next函数先将指针移到 Generator 函数的下一步（gen.next方法），然后判断 Generator 函数是否结束（result.done属性），如果没结束，就将next函数再传入 Thunk 函数（result.value属性），否则就直接退出
```

> 有了这个**执行器**，执行 Generator 函数方便多了。不管**内部有多少个异步操作**，直接把 Generator 函数**传入**`run`函数即可。当然，**前提是**每一个异步操作，都要是 Thunk 函数，也就是说，跟在`yield`命令**后面的必须是 Thunk 函数**

```javascript
var g = function* (){
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);
//上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行
```

> Thunk **函数并不是** Generator 函数**自动执行的唯一方案**。因为**自动执行的关键是**，**必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权**。**回调函数**可以做到这一点，**Promise 对象**也可以做到这一点

#### co模块

##### 基本用法

> [co 模块](https://github.com/tj/co)是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，**用于 Generator 函数的自动执行**

> 下面是一个 Generator 函数，用于依次读取两个文件

```javascript
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

> **co 模块**可以**让你不用编写 Generator 函数的执行器**

```javascript
var co = require('co');
co(gen);
//上面代码中，Generator 函数只要传入co函数，就会自动执行
```

> `co`函数返回一个`Promise`对象，因此**可以用**`then`方法**添加回调函数**

```javascript
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

> 上面代码中，等到 Generator 函数执行结束，就会输出一行提示

##### co模块的原理

> 为什么 co 可以自动执行 Generator 函数？

> 前面说过，Generator **就是一个异步操作的容器**。它的**自动执行**需要一种**机制**，当**异步操作有了结果**，**能够自动交回执行权**

> **两种**方法可以做到这一点
>
> （1）**回调函数**。将异步操作**包装成 Thunk 函数，**在回调函数里面交回执行权。
>
> （2）**Promise 对象**。将**异步操作包装成 Promise 对象**，用`then`方法交回执行权

> co 模块**其实就是将两种自动执行器**（Thunk 函数和 Promise 对象），包装成**一个模块**。使用 co 的**前提条件是**，Generator 函数的`yield`命令后面，**只能**是 Thunk 函数或 Promise 对象。**如果数组或对象的成员，全部都是 Promise 对象**，也可以使用 co，详见后文的例子

> 上一节已经介绍了基于 Thunk 函数的自动执行器。下面来看，基于 Promise 对象的**自动执行器**。这是理解 co 模块必须的

##### 基于Promise对象的自动执行

> 还是沿用上面的例子。首先，把`fs`模块的`readFile`方法包装成一个 Promise 对象

```javascript
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

> 然后，**手动执行**上面的 Generator 函数

```javascript
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
```

> **手动执行其实就是用**`then`方法，**层层添加回调函数**。理解了这一点，就可以写出一个自动执行器

```javascript
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
```

> 上面代码中，只要 Generator 函数**还没执行到最后一步**，`next`函数就**调用自身**，**以此实现自动执行**

##### co模块的源码

> co 就是上面那个**自动执行器的扩展**，它的源码只有几十行，非常简单

> 首先，co 函数**接受 Generator 函数作为参数**，**返回**一个 Promise 对象

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
  });
}
```

> 在**返回**的 Promise 对象里面，co **先检查参数**`gen`**是否**为 Generator 函数。**如果是**，**就执行该函数**，**得到一个内部指针对象**；**如果不是就返回**，并将 Promise 对象的**状态改为**`resolved`

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
```

> 接着，co 将 Generator 函数的**内部指针对象**的`next`方法，**包装**成`onFulfilled`函数。**这主要是为了能够捕捉抛出的错误**

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}
```

> 最后，就是**关键**的`next`函数，它会**反复调用自身**

```javascript
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
```

> 上面代码中，`next`函数的内部代码，一共只有四行命令。
>
> 第一行，检查**当前是否**为 Generator 函数的**最后一步**，**如果是就返回**。
>
> 第二行，**确保每一步的返回值，是 Promise 对象**。
>
> 第三行，使用`then`方法，为**返回值加上回调函数**，然后**通过`onFulfilled`函数再次调用`next`函数**。
>
> 第四行，**在参数不符合要求的情况下**（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的**状态改为**`rejected`，**从而终止执行**。

##### 处理并发的异步操作

> co 支持**并发**的**异步操作**，即允许某些操作**同时进行**，等到它们**全部完成，才进行下一步**

> 这时，要把**并发的操作都**放在**数组或对象里面**，**跟在**`yield`语句后面

```javascript
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);
```

> 下面是另一个例子

```javascript
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
//上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步
```

##### 实例：处理Stream

> Node 提供 Stream 模式**读写数据**，特点**是一次只处理数据的一部分**，数据**分成一块块依次处理**，就**好像“数据流”一样**。这**对于处理大规模数据非常有利**。Stream **模式使用** EventEmitter API，会**释放三个事件**

> - `data`事件：**下一块数据块已经准备好了。**
> - `end`事件：**整个“数据流”处理完了。**
> - `error`事件：**发生错误。**

> 使用`Promise.race()`函数，**可以判断这三个事件之中哪一个最先发生**，**只有**当`data`事件最先发生时，**才进入下一个数据块的处理**。从而，我们可以通过一个`while`循环，完成**所有数据的读取**

```javascript
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
//上面代码采用 Stream 模式读取《悲惨世界》的文本文件，对于每个数据块都使用stream.once方法，在data、end、error三个事件上添加一次性回调函数。变量res只有在data事件发生时才有值，然后累加每个数据块之中valjean这个词出现的次数
```

