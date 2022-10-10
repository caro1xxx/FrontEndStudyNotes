> JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...

> 此外，JavaScript 允许自定义对象。

## 所有事物都是对象

> JavaScript 提供多个内建对象，比如 String、Date、Array 等等。 对象只是带有属性和方法的特殊数据类型

- 布尔型可以是一个对象。
- 数字型可以是一个对象。
- 字符串也可以是一个对象
- 日期是一个对象
- 数学和正则表达式也是对象
- 数组是一个对象
- 甚至函数也可以是对象

## JavaScript 对象

> 对象只是一种特殊的数据。对象拥有属性和方法。

## 访问对象的属性

属性是与对象相关的值。

访问对象属性的语法是：

```JS
objectName.propertyName
```

这个例子使用了 String 对象的 length 属性来获得字符串的长度

```JS
var message="Hello World!";
var x=message.length;
输出 12
```

## 访问对象的方法

> 方法是能够在对象上执行的动作。

您可以通过以下语法来调用方法：

```JS
objectName.methodName()
```

> 这个例子使用了 String 对象的 toUpperCase() 方法来将文本转换为大写

```JS
var message="Hello world!";
var x=message.toUpperCase();
输出 HELLO WORLD!
```

## 创建 JavaScript 对象

> 通过 JavaScript，您能够定义并创建自己的对象

两种不同的方法：

- 使用 Object 定义并创建对象的实例。
- 使用函数来定义对象，然后创建新的对象实例。

## 使用 Object

> 几乎所有的对象都是 Object 类型的实例，它们都会从 Object.prototype 继承属性和方法。

> Object 构造函数创建一个对象包装器

Object 构造函数，会根据给定的参数创建对象，具体有以下情况

- 如果给定值是 null 或 undefined，将会创建并返回一个空对象。
- 如果传进去的是一个基本类型的值，则会构造其包装类型的对象。
- 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址。
- 当以非构造函数形式被调用时，Object 的行为等同于 new Object()。

```JS
// 以构造函数形式来调用
new Object([value])
```

> value 可以是任何值。

以下实例使用 Object 生成布尔对象：

```JS
// 等价于 o = new Boolean(true);
var o = new Object(true);
```

创建了对象的一个新实例，并向其添加了四个属性

```JS
person=new Object();
person.firstname="John";
person.lastname="Doe";
person.age=50;
person.eyecolor="blue";
```

> 也可以使用对象字面量来创建对象

```JS
{ name1 : value1, name2 : value2,...nameN : valueN }
```

> 其实就是大括号里面创建 name:value 对，然后 name:value 对之间以逗号 , 隔开

```JS
person={firstname:"John",lastname:"Doe",age:50,eyecolor:"blue"};
```

> JavaScript 对象就是一个 name:value 集合

## 使用对象构造器

使用函数来构造对象

```JS
function person(firstname,lastname,age,eyecolor)
{
  this.firstname=firstname;
  this.lastname=lastname;
  this.age=age;
  this.eyecolor=eyecolor;
}
```

> this通常指向的是我们正在执行的函数本身，或者是指向该函数所属的对象（运行时）

## 创建 JavaScript 对象实例

一旦您有了对象构造器，就可以创建新的对象实例，就像这样

```JS
var myFather=new person("John","Doe",50,"blue");
var myMother=new person("Sally","Rally",48,"green");
```

## 把属性添加到 JavaScript 对象

> 您可以通过为对象赋值，向已有对象添加新属性：

假设 person 对象已存在 - 您可以为其添加这些新属性：firstname、lastname、age 以及 eyecolor：

```JS
person.firstname="John";
person.lastname="Doe";
person.age=30;
person.eyecolor="blue";

x=person.firstname;
```

## 把方法添加到 JavaScript 对象

> 方法只不过是附加在对象上的函数。
>
> 在构造器函数内部定义对象的方法

```JS
function person(firstname,lastname,age,eyecolor)
{
  this.firstname=firstname;
  this.lastname=lastname;
  this.age=age;
  this.eyecolor=eyecolor;

  this.changeName=changeName;
  function changeName(name)
  {
    this.lastname=name;
  }
}
```

changeName() 函数 name 的值赋给 person 的 lastname 属性。

## JavaScript 类

> JavaScript 是面向对象的语言，但 JavaScript 不使用类。

> 在 JavaScript 中，不会创建类，也不会通过类来创建对象（就像在其他面向对象的语言中那样）。

> JavaScript 基于 prototype，而不是基于类的。

## JavaScript for...in 循环

> JavaScript for...in 语句循环遍历对象的属性。

```JS
for (variable in object)

{

  执行的代码……

}
```

> **注意： for...in 循环中的代码块将针对每个属性执行一次**

## JavaScript 的对象是可变的

> 对象是可变的，它们是通过引用来传递的。

以下实例的 person **对象不会创建副本**

```JS
var x = person; // 不会创建 person 的副本，是引用
```

> 如果修改 x ，person 的属性也会改变：

```JS
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}

var x = person;

x.age = 10;      // x.age 和 person.age 都会改变
```

## new 和不 new的区别：

- 如果 new 了函数内的 this 会指向当前这个 person 并且就算函数内部不 return 也会返回一个对象。
- 如果不 new 的话函数内的 this 指向的是 window。

```JS
function person(firstname,lastname,age,eyecolor)
{
  this.firstname=firstname;
  this.lastname=lastname;
  this.age=age;
  this.eyecolor=eyecolor;
  return [this.firstname,this.lastname,this.age,this.eyecolor,this]
}


var myFather=new person("John","Doe",50,"blue");
var myMother=person("Sally","Rally",48,"green");
console.log(myFather) // this 输出一个 person 对象
console.log(myMother) // this 输出 window 对象
```

