#### Symbol

##### 概述

> ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都**是独一无二**的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因

> Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

```javascript
let s = Symbol();

typeof s
// "symbol"
```

> 上面代码中，**变量s**就是一个**独一无二的值**。typeof运算符的结果，表明**变量s是 Symbol 数据类型**，而**不是字符串之类的其他类型**

> 注意，`Symbol`函数前**不能**使用`new`命令，否则会报错。这是因为生成的 Symbol 是**一个原始类型的值**，**不是对象**。也就是说，由于 Symbol 值不是对象，**所以不能添加属性**。基本上，它是一种**类似于字符串的数据类型**

> `Symbol`函数可以**接受一个字符串作为参数**，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

> 上面代码中，`s1`和`s2`是**两个 Symbol 值**。**如果不加参数**，它们在控制台的**输出都是**`Symbol()`，不利于区分。**有了参数以后**，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值

> 如果 Symbol 的参数是一个**对象**，就会调用该对象的`toString`方法，将其**转为字符串**，**然后才生成一个 Symbol 值**

```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

> 注意，`Symbol`函数的**参数**只是表示对当前 Symbol 值的**描述**，因此相同参数的`Symbol`函数的**返回值是不相等的**

```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

> Symbol **值不能与其他类型的值进行运算**，会报错

```javascript
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

> 但是，Symbol 值**可以显式转为字符串**

```javascript
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

> 另外，Symbol 值也可以转为布尔值，但是不能转为数值

```javascript
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```

#### Symbol.prototype.description

> 创建 Symbol 的时候，可以添加一个描述

```javascript
const sym = Symbol('foo');
//上面代码中，sym的描述就是字符串foo
```

> 但是，**读取**这个描述需要将 Symbol **显式转为字符串**，即下面的写法

```javascript
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"
```

> 上面的用法不是很方便。[ES2019](https://github.com/tc39/proposal-Symbol-description) 提供了一个**实例属性**`description`，**直接返回 Symbol 的描述**

```javascript
const sym = Symbol('foo');

sym.description // "foo"
```

#### 作为属性名的Symbol

> 由于每一个 Symbol 值**都是不相等的**，这意味着 Symbol 值**可以作为标识符**，用于对象的属性名，就能**保证不会出现同名的属性**。这对于一个对象由多个模块构成的情况非常有用，**能防止某一个键被不小心改写或覆盖**

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

//上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个 Symbol 值
```

> 注意，Symbol 值**作为对象属性名时**，**不能用点运算符**

```javascript
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

> 在**对象的内部**，使用 Symbol 值**定义属性时**，Symbol 值**必须放在方括号之中**

```javascript
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
//上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值
```

> 采用增强的对象写法，上面代码的`obj`对象可以写得更简洁一些

```javascript
let obj = {
  [s](arg) { ... }
};
```

> Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的

```javascript
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');
```

> 1. 常量使用 Symbol 值**最大的好处**，就是其他任何值都**不可能有相同**的值了，因此可以保证上面的`switch`语句**会按设计的方式工作**。
>
> 2. 还有一点需要注意，Symbol 值**作为属性名时**，该属性**还是公开属性，不是私有属性**

#### 实例：消除魔术字符串

> 魔术字符串指的是，在**代码之中多次出现**、与**代码形成强耦合的某一个具体的字符串或者数值**。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替

```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

//上面代码中，字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护
```

> 常用的消除魔术字符串的方法，就是**把它写成一个变量**

```javascript
//定义变量
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
          //使用
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
//使用
getArea(shapeType.triangle, { width: 100, height: 100 });
//上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合
```

> 如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用 Symbol 值

```javascript
const shapeType = {
  triangle: Symbol()
};
//上面代码中，除了将shapeType.triangle的值设为一个 Symbol，其他地方都不用修改
```

#### 属性名的遍历

> Symbol **作为属性名**，**遍历对象的时候**，该属性**不会出现**在`for...in`、`for...of`循环中，也**不会被**`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`**返回**

> 但是，它**也不是私有属性**，有一个`Object.getOwnPropertySymbols()`方法，可以**获取指定对象的所有 Symbol 属性名**。该方法**返回一个数组，**成员是**当前对象的所有用作属性名的 Symbol 值**

```javascript
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
//上面代码是Object.getOwnPropertySymbols()方法的示例，可以获取所有 Symbol 属性名
```

> 下面是另一个例子，`Object.getOwnPropertySymbols()`方法与`for...in`循环、`Object.getOwnPropertyNames`方法进行对比的例子

```javascript
const obj = {};
const foo = Symbol('foo');

obj[foo] = 'bar';

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]
```

> 另一个新的 API，`Reflect.ownKeys()`方法可以**返回所有类型的键名**，**包括常规键名和 Symbol 键名**

```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

> 由于以 Symbol 值作为键名，**不会被常规方法遍历得到**。我们可以利用这个特性，为对象定义一些**非私有的**、但又希望**只用于内部的方法**

```javascript
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
//上面代码中，对象x的size属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果
```

#### Symbol.for(), Symbol.ketFor()

> 有时，我们希望重新**使用同一个** Symbol 值，`Symbol.for()`方法可以做到这一点。它**接受一个字符串作为参数**，然后**搜索**有没有以该参数**作为名称的 Symbol 值**。如果**有**，就返回这个 **Symbol 值**，**否则**就**新建**一个**以该字符串为名称**的 Symbol 值，并将其**注册到全局**

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
//上面代码中，s1和s2都是 Symbol 值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值
let a = Symbol('foo');
let b = Symbol('foo');
console.log(a === b);// false
```

> `Symbol.for()`与`Symbol()`这两种写法，**都会生成新的 Symbol**。它们的**区别**是，**前者**会被**登记在全局环境中供搜索**，**后者不会**。`Symbol.for()`**不会每次调用就返回一个新的 Symbol 类型的值**，而是会先**检查给定的`key`是否已经存在**，如果**不存在**才会**新建一个值**。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值

```javascript
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

//由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值
```

> `Symbol.keyFor()`方法返回一个**已登记**的 Symbol 类型值的`key`

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

//变量s2属于未登记的 Symbol 值，所以返回undefined
```

> **注意，**`Symbol.for()`为 Symbol 值**登记的名字**，是**全局环境**的，**不管有没有在全局环境运行**

```javascript
function foo() {
  return Symbol.for('bar');
}

const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true
//Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值
```

#### 实例：模块的Singleton模式

> **Singleton 模式**指的是**调用一个类**，**任何时候**返回的都是**同一个实例**

**.....**

#### 内置的Symbol值

> **除了**定义自己使用的 Symbol 值以外，ES6 还提供了 **11 个内置**的 Symbol **值**，**指向语言内部使用的方法**

##### Symbol.hasInstance

> 对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，**判断是否为该对象的实例时**，**会调用**这个方法。比如，`foo instanceof Foo`在语言内部，**实际调用**的是`Foo[Symbol.hasInstance](foo)`

```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
//上面代码中，MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算是否为Array的实例
```

> 另一个例子

```javascript
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

##### Symbol.isConcatSpreadable

> 对象的`Symbol.isConcatSpreadable`属性等于一个**布尔值**，表示该对象用于`Array.prototype.concat()`时，**是否可以展开**

```javascript
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
//数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果
```

> 类似数组的对象**正好相反**，**默认不展开**。它的`Symbol.isConcatSpreadable`属性设为`true`，**才可以展开**

```javascript
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```

> `Symbol.isConcatSpreadable`属性**也可以定义在类里面**

```javascript
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
//上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果
```

> **注意**，`Symbol.isConcatSpreadable`的位置差异，`A1`是定义在实例上，`A2`是定义在类本身，效果相同

##### Symbol.species

> 对象的`Symbol.species`属性，指向一个构造函数。创建衍生对象时，会使用该属性

```javascript
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
//上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例
```

> `Symbol.species`属性就是为了解决这个问题而提供的。现在，我们可以为`MyArray`设置`Symbol.species`属性

```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
//上面代码中，由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。默认的Symbol.species属性等同于下面的写法
```

```javascript
static get [Symbol.species]() {
  return this;
}
```

> 现在，再来看前面的例子

```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
//上面代码中，a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例
```

```javascript
class T1 extends Promise {
}

class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

new T1(r => r()).then(v => v) instanceof T1 // true
new T2(r => r()).then(v => v) instanceof T2 // false
//上面代码中，T2定义了Symbol.species属性，T1没有。结果就导致了创建衍生对象时（then方法），T1调用的是自身的构造方法，而T2调用的是Promise的构造方法
```

> 总之，`Symbol.species`的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例

##### Symbol.match

> 对象的`Symbol.match`属性，**指向一个函数**。当执行`str.match(myObject)`时，**如果该属性存在，会调用它，返回该方法的返回值**

```javascript
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

##### Symbol.replace

> 对象的`Symbol.replace`属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值

```javascript
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

> 下面是一个例子

```javascript
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
```

> `Symbol.replace`方法会收到两个参数，第一个参数是`replace`方法正在作用的对象，上面例子是`Hello`，第二个参数是替换后的值，上面例子是`World`

##### Symbol.search

> 对象的`Symbol.search`属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值

```javascript
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

