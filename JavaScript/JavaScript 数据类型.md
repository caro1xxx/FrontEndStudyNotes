> 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol

> 引用数据类型：对象(Object)、数组(Array)、函数(Function)

## JavaScript 拥有动态类型

> JavaScript 拥有**动态类型**。这意味着**相同的变量可用作不同的类型**

```js
var x;        // x 为 undefined
var x = 5;      // 现在 x 为数字
var x = "John";   // 现在 x 为字符串
```

## JavaScript 字符串

字符串是**存储字符**（比如 "Bill Gates"）的变量

字符串可以是引号中的任意文本。您可以**使用单引号或双引号**

## JavaScript 数字

> JavaScript **只有一种数字类型**。数字**可以带小数点**，**也可以不带**
>
> 极大或极小的数字可以通过科学（指数）计数法来书写

```js
var y=123e5;   // 12300000
var z=123e-5;   // 0.00123
```

## JavaScript 布尔

true 或 false

## JavaScript 数组

创建名为 cars 的数组

```js
var cars=new Array();
cars[0]="Saab";
cars[1]="Volvo";
cars[2]="BMW";
```

或者 (condensed array)

```js
var cars=new Array("Saab","Volvo","BMW");
```

或者 (literal array):

```js
var cars=["Saab","Volvo","BMW"];
```

## JavaScript 对象

> **对象由花括号分隔**。在**括号内部**，对象的属性以**名称和值对的形式 (name : value) 来定义**。属性由**逗号分隔**

```js
var person={firstname:"John", lastname:"Doe", id:5566};
```

对象属性有**两种寻址方式**

```js
name=person.lastname;
name=person["lastname"];
```

## Undefined 和 Null

> Undefined 这个值表示**变量不含有值**
>
> 可以通过将变量的值**设置为 null 来清空变量**

```js
cars=null;
person=null;
```

## 声明变量类型

> 当您声明**新变量时**，可以使用**关键词 "new" 来声明其类型**

```js
var carname=new String;
var x=   new Number;
var y=   new Boolean;
var cars=  new Array;
var person= new Object;
```

**JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象**

