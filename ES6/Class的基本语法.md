#### 简介

##### 类的由来

> JavaScript 语言中，生成实例对象的传统方法是通过构造函数

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

> 上面这种写法跟传统的**面向对象语言（比如 C++ 和 Java）差异很大**，很容易让新学习这门语言的程序员感到困惑

> ES6 **提供了更接近传统语言的写法**，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类

> 基本上，ES6 的`class`可以**看作只是一个语法糖**，它的**绝大部分功能**，**ES5 都可以做到**，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
//上面代码定义了一个“类”，可以看到里面有一个constructor()方法，这就是构造方法，而this关键字则代表实例对象。这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数Point是一致的
```

> `Point`类**除了构造方法**，还定义了一个`toString()`方法。注意，定义`toString()`方法的时候，**前面不需要加上**`function`这个关键字，直接把函数定义放进去了就可以了。另外，**方法与方法之间不需要逗号分隔**，**加了会报错**

> ES6 的类，完全可以看**作构造函数的另一种写法**

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
//上面代码表明，类的数据类型就是函数，类本身就指向构造函数
```

> **使用**的时候，也是**直接对类使用**`new`命令，**跟构造函数的用法完全一致**

```javascript
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

const b = new Bar();
b.doStuff() // "stuff"
```

> **构造函数的`prototype`属性**，在 ES6 的“类”**上面继续存在**。事实上，**类的所有方法都定义在类的`prototype`属性上面**

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
//上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在Point.prototype上面
```

> 因此，在**类的实例上面调用方法**，**其实就是调用原型上的方法**

```javascript
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true
//上面代码中，b是B类的实例，它的constructor()方法就是B类原型的constructor()方法
```

> 由于**类的方法都定义在`prototype`对象上面，**所以类的**新方法可以添加在`prototype`对象上面**。`Object.assign()`方法**可以很方便地一次**向类添加**多个方法**

```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

> `prototype`对象的`constructor()`属性，**直接指向“类”的本身**，这与 ES5 的行为是一致的

```javascript
Point.prototype.constructor === Point // true
```

> **另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）**

```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
//上面代码中，toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致
```

```javascript
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
//上面代码采用 ES5 的写法，toString()方法就是可枚举的
```

##### constructor方法

> `constructor()`方法**是类的默认方法**，通过`new`命令**生成对象实例时，自动调用该方法**。一个类**必须有**`constructor()`方法，**如果没有显式**定义，**一个空的**`constructor()`方法会**被默认添加**

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
//上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor()方法
```

> `constructor()`方法**默认返回实例对象**（即`this`），**完全可以指定返回另外一个对象**

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

> 上面代码中，`constructor()`函数**返回一个全新的对象**，结果导致实例**对象不是`Foo`类的实例**

> **类必须使用**`new`调用，**否则会报错**。这是它**跟普通构造函数**的一个**主要区别**，**后者不用**`new`也可以执行

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

##### 类的实例

> **生成类**的实例的写法，与 **ES5 完全一样**，也是**使用**`new`命令。前面说过，**如果忘记加上**`new`，**像函数那样调用**`Class`，**将会报错**

```javascript
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

> 与 ES5 一样，实例的属性**除非显式定义在其本身**（即定义在`this`对象上），**否则都是定义在原型上**（即定义在`class`上）

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
//上面代码中，x和y都是实例对象point自身的属性（因为定义在this对象上），所以hasOwnProperty()方法返回true，而toString()是原型对象的属性（因为定义在Point类上），所以hasOwnProperty()方法返回false。这些都与 ES5 的行为保持一致
```

> 与 ES5 一样，类的**所有实例共享一个原型对象**

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

> 上面代码中，`p1`和`p2`都是`Point`的实例，它们的**原型都是**`Point.prototype`，**所以`__proto__`属性是相等的**

> 这也**意味着**，可以通**过实例**的`__proto__`属性**为“类”添加方法**
>
> * `__proto__` **并不是语言本身的特性**，这是各大厂商**具体实现时添加**的**私有属性**，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但**依旧不建议在生产中使用该属性**，**避免对环境产生依赖**。**生产环境中**，我们可以使用 `Object.getPrototypeOf` 方法来**获取实例对象的原型**，然后再来**为原型添加方法/属性**

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
//上面代码在p1的原型上添加了一个printName()方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例
```

##### 取值函数(getter)和存值函数(setter)

> 与 ES5 一样，**在“类”的内部可以使用**`get`和`set`关键字，**对某个属性**设置**存值函数和取值函数**，**拦截该属性的存取行为**

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
//上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了
```

> 存值函数和取值函数是设置在**属性的 Descriptor 对象上的**

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
//上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致
```

##### 属性表达式

> 类的**属性名**，可以**采用表达式**

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
//上面代码中，Square类的方法名getArea，是从表达式得到的
```

##### Class表达式

> 与**函数一样**，**类也可以使用表达式的形式定义**

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

> 上面代码使用表达式定义了一个类。**需要注意的是**，**这个类的名字是**`Me`，但是`Me`**只在 Class 的内部可用**，**指代**当前类。**在 Class 外部**，这个类**只能用`MyClass`引用**

```javascript
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
//上面代码表示，Me只在 Class 内部有定义
```

> 如果**类的内部没用到的话**，**可以省略**`Me`，也就是可以写成下面的形式

```javascript
const MyClass = class { /* ... */ };
```

> 采用 **Class 表达式**，可以**写出立即执行的 Class。**

```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
//上面代码中，person是一个立即执行的类的实例
```

##### 注意点

> **（1）严格模式**
>
> 类和模块的内部，**默认就是严格模式**，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式

> **（2）不存在提升**
>
> **类不存在变量提升（hoist）**，这一点与 ES5 完全不同

```javascript
new Foo(); // ReferenceError
class Foo {}
//上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义
```

```javascript
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
//上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义
```

> **（3）name 属性**
>
> 由于本质上，ES6 的**类只是** ES5 的**构造函数的一层包装**，**所以函数的许多特性都被`Class`继承，包括`name`属性。**

```javascript
class Point {}
Point.name // "Point"
```

> `name`属性**总是返回紧跟**在`class`**关键字后面的类名**

> **（4）Generator 方法**
>
> 如果**某个方法之前加上星号**（`*`），就**表示该方法是一个 Generator 函数**

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
//上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器
```

> **（5）this 的指向**
>
> 类的方法**内部如果含有**`this`，它**默认指向类的实例**。**但是**，必须非常小心，**一旦单独使用该方法，很可能报错**

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
//上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错
```

> 一个**比较简单的解决方法**是，**在构造方法中绑定**`this`，这样**就不会找不到`print`方法了**

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

> 另一种**解决方法是使用箭头函数**

```javascript
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
//箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象
```

> 还有一种**解决方法是使用**`Proxy`，**获取方法的时候，自动绑定**`this`

```javascript
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

#### 静态方法

> **类相当于实例的原型**，所有在**类中定义的方法**，**都会被实例继承**。如果在一个**方法前**，**加上**`static`关键字，就**表示该方法不会被实例继承**，而是**直接通过类来调用，这就称为“静态方法”**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
//上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法
```

> **注意**，如果**静态方法包含**`this`**关键字**，这个`this`**指的是类**，而**不是实例**

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
//上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名
```

> **父类的静态方法**，**可以被子类继承**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
//上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法
```

> **静态方法也是**可以从`super`**对象上调用的**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

#### 实例属性的新写法

> 实例属性**除了定义**在`constructor()`方法里面的`this`上面，**也可以定义在类的最顶层**

```javascript
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
//上面代码中，实例属性this._count定义在constructor()方法里面
```

> **另一种写法是**，这个属性**也可以定义在类的最顶层**，**其他都不变**

```javascript
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
//上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this
```

> **这种新写法的好处是**，所有**实例对象自身的属性都定义在类的头部**，看上去**比较整齐**，**一眼就能看出**这个类**有哪些实例属性**

```javascript
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
//上面的代码，一眼就能看出，foo类有两个实例属性，一目了然。另外，写起来也比较简洁
```

#### 静态属性

> **静态属性指的是 Class 本身的属性**，**即**`Class.propName`，**而不是定义**在实例对象（`this`）上的属性

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
//上面的写法为Foo类定义了一个静态属性prop
```

> 目前，**只有这种写法可行**，因为 ES6 **明确规定**，Class **内部只有静态方法，没有静态属性**。**现在有一个**[提案](https://github.com/tc39/proposal-class-fields)提供了类的**静态属性**，**写法**是在实例**属性的前面**，**加上`static`关键字**

```javascript
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```

> 这个新写法大大方便了静态属性的表达

```javascript
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
//上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好
```

#### 私有方法和私有属性

##### 现有的解决方案

> 私有方法和私有属性，是**只能在类的内部访问的方法和属性**，**外部不能**访问。这是常见需求，有利于代码的封装，**但 ES6 不提供**，**只能通过**变通方法模拟实现

```javascript
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
//上面代码中，_bar()方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法
```

> **另一种方法**就是索性将私有方法**移出类**，**因为类**内部的**所有方法**都是**对外可见的**

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
//上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar()实际上成为了当前类的私有方法
```

> **还有一种方法是利用**`Symbol`**值的唯一性**，将私有方法的**名字命名为一个`Symbol`值**

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

> 上面代码中，`bar`和`snaf`都是`Symbol`值，一般情况下**无法获取到它**们，因此达到了私有方法和私有属性的效果。但是**也不是绝对不行**，`Reflect.ownKeys()`**依然可以拿到它们**

```javascript
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
//上面代码中，Symbol 值的属性名依然可以从类的外部拿到
```

##### 私有属性的提案

> 目前，有一个[提案](https://github.com/tc39/proposal-private-methods)，为`class`**加了私有属性**。方法是在**属性名之前**，**使用`#`表示**

```javascript
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
//上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错
```

```javascript
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
//上面代码在类的外部，读取私有属性，就会报错
```

> 下面是另一个例子

```javascript
class Point {
  #x;

  constructor(x = 0) {
    this.#x = +x;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = +value;
  }
}
//上面代码中，#x就是私有属性，在Point类之外是读取不到这个属性的。由于井号#是属性名的一部分，使用时必须带有#一起使用，所以#x和x是两个不同的属性
```

> 之所以要引入一个新的前缀`#`表示私有属性，**而没有采用**`private`关键字，是**因为 JavaScript 是一门动态语言**，没有类型声明，**使用独立的符号似乎是唯一的比较方便可靠的方法**，能够准确地区分一种属性是否为私有属性。另外，**Ruby 语言使用**`@`表示私有属性，ES6 没有用这个符号而使用`#`，**是因为`@`已经被留给了 Decorator**

> 这种写法**不仅可以写私有属性**，**还可以用来写私有方法**

```javascript
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
//上面代码中，#sum()就是一个私有方法
```

> 另外，**私有属性**也**可以设置** getter 和 setter 方法

```javascript
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
//上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()来完成
```

> 私有属性**不限于从**`this`引用，**只要是在类的内部**，**实例也可以引用**私有属性

```javascript
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
//上面代码允许从实例foo上面引用私有属性
```

> 私有属性和私有方法**前面**，**也可以加上**`static`**关键字**，**表示这是一个**静态的私有属性或私有方法

```javascript
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
//上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。
```

##### in运算符

> `try...catch`结构可以用来**判断是否存在某个私有属性**

```javascript
class A {
  use(obj) {
    try {
      obj.#foo;
    } catch {
      // 私有属性 #foo 不存在
    }
  }
}

const a = new A();
a.use(a); // 报错
```

> 上面示例中，类`A`**并不存在私有属性**`#foo`，所以`try...catch`报错了

> 这样的**写法很麻烦**，**可读性很差**，V8 引擎改进了`in`运算符，使**它也可以用来判断私有属性**

```javascript
class A {
  use(obj) {
    if (#foo in obj) {
      // 私有属性 #foo 存在
    } else {
      // 私有属性 #foo 不存在
    }
  }
}
//上面示例中，in运算符判断当前类A的实例，是否有私有属性#foo，如果有返回true，否则返回false
```

> `in`也**可以跟**`this`一起**配合使用**

```javascript
class A {
  #foo = 0;
  m() {
    console.log(#foo in this); // true
    console.log(#bar in this); // false
  }
}
```

> **注意**，**判断私有属性时**，`in`**只能**用在**定义该私有属性的类的内部**

```javascript
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}

A.test(new A()) // true
A.test({}) // false

class B {
  #foo = 0;
}

A.test(new B()) // false
//上面示例中，类A的私有属性#foo，只能在类A内部使用in运算符判断，而且只对A的实例返回true，对于其他对象都返回false
```

> **子类从父类继承的私有属性**，**也可以使用**`in`运算符来判断

```javascript
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}

class SubA extends A {};

A.test(new SubA()) // true
//上面示例中，SubA从父类继承了私有属性#foo，in运算符也有效
```

> **注意**，`in`运算符**对于**`Object.create()`、`Object.setPrototypeOf`**形成的继承，是无效的**，因为**这种继承不会传递私有属性**

```javascript
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}
const a = new A();

const o1 = Object.create(a);
A.test(o1) // false
A.test(o1.__proto__) // true

const o2 = {};
Object.setPrototypeOf(o2, A);
A.test(o2) // false
A.test(o2.__proto__) // true
//上面示例中，对于修改原型链形成的继承，子类都取不到父类的私有属性，所以in运算符无效
```

#### 静态块

> 静态属性的**一个问题是**，它的**初始化要么写在类的外部**，**要么写**在`constructor()`**方法里面**

```javascript
class C {
  static x = 234;
  static y;
  static z;
}

try {
  const obj = doSomethingWith(C.x);
  C.y = obj.y
  C.z = obj.z;
} catch {
  C.y = ...;
  C.z = ...;
}
//上面示例中，静态属性y和z的值依赖静态属性x，它们的初始化写在类的外部（上例的try...catch代码块）。另一种方法是写到类的constructor()方法里面。这两种方法都不是很理想，前者是将类的内部逻辑写到了外部，后者则是每次新建实例都会运行一次
```

> 为了解决这个问题，ES2022 引入了[静态块](https://github.com/tc39/proposal-class-static-block)（static block），**允许在类的**内部**设置一个代码块**，在类**生成时运行一次**，**主要作用**是对静态属性进行**初始化**

```javascript
class C {
  static x = ...;
  static y;
  static z;

  static {
    try {
      const obj = doSomethingWith(this.x);
      this.y = obj.y;
      this.z = obj.z;
    }
    catch {
      this.y = ...;
      this.z = ...;
    }
  }
}
//上面代码中，类的内部有一个 static 代码块，这就是静态块。它的好处是将静态属性y和z的初始化逻辑，写入了类的内部，而且只运行一次
```

> 每个类**只能有一个静态块**，在静态属性**声明后运行**。静态块的**内部不能有`return`语句**

> 静态块内部**可以使用类名或`this`，指代当前类**

```c
class C {
  static x = 1;
  static {
    this.x; // 1
    // 或者
    C.x; // 1
  }
}
//上面示例中，this.x和C.x都能获取静态属性x
```

> **除了**静态属性的**初始化**，静态块**还有一个作用**，就是**将私有属性与类的外部代码分享**

```javascript
let getX;

export class C {
  #x = 1;
  static {
    getX = obj => obj.#x;
  }
}

console.log(getX(new C())); // 1
//上面示例中，#x是类的私有属性，如果类外部的getX()方法希望获取这个属性，以前是要写在类的constructor()方法里面，这样的话，每次新建实例都会定义一次getX()方法。现在可以写在静态块里面，这样的话，只在类生成时定义一次
```

#### new.target属性

> `new`是**从构造函数生成实例对象的命令**。ES6 为`new`命令引入了一个`new.target`属性，该属性**一般用在构造函数之中**，返回`new`命令**作用于的那个构造函数**。如果构造函数**不是通过**`new`命令**或`Reflect.construct()`调用的**，`new.target`**会返回**`undefined`，因此这个属性可以用来**确定构造函数是怎么调用的**

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
//上面代码确保构造函数只能通过new命令调用
```

> Class **内部调用**`new.target`，返回**当前 Class**

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

> **需要注意的是**，**子类继承父类时**，`new.target`**会返回子类**

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
//上面代码中，new.target会返回子类
```

> 利用这个特点，可以**写出不能独立使用**、**必须继承后**才能使用的类

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
//上面代码中，Shape类不能被实例化，只能用于继承
```

> **注意，在函数外部，使用`new.target`会报错**

