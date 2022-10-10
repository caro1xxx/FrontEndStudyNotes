> 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块

```js
<script>
    function myFunction()
    {
      alert("Hello World!");
    }
</script>
</head>
<body>
	<button onclick="myFunction()">点我</button>
</body>
```

## JavaScript 函数语法

> 函数就是包裹在**花括号中**的代码块，前面使用了**关键词 function**

```js
function functionname()
{
  // 执行代码
}
```

> JavaScript 对大小写敏感。关键词 function 必须是小写的，并且必须以与函数名称相同的大小写来调用函数

## 调用带参数的函数

> 在调用函数时，您可以向其传递值，这些值被称为**参数**

> 这些参数可以在函数中使用
> 您可以发送任意多的参数，由逗号 (,) 分隔

```js
myFunction(argument1,argument2)
```

当您声明函数时，请把参数作为变量来声明

```js
function myFunction(var1,var2)
{
代码
}
```

变量和参数**必须以一致的顺序出现**。第一个变量就是第一个被传递的参数的给定的值，以此类推

```js
<p>点击这个按钮，来调用带参数的函数。</p>
<button onclick="myFunction('Harry Potter','Wizard')">点击这里</button>
<script>
    function myFunction(name,job){
  	alert("Welcome " + name + ", the " + job);
}
</script>
```

## 带有返回值的函数

有时，我们会希望函数将值返回调用它的地方。

通过使用 return 语句就可以实现。

在使用 return 语句时，函数会停止执行，并返回指定的值

语法

```js
function myFunction()
{
  var x=5;
  return x;
}
```

> **注意： 整个 JavaScript 并不会停止执行，仅仅是函数。JavaScript 将继续执行代码，从调用函数的地方。**

> 函数调用将被**返回值取代**

```js
var myVar=myFunction();
```

myVar 变量的值是 5，也就是函数 "myFunction()" 所返回的值

**即使不把它保存为变量**，您也可以**使用返回值**

```js
document.getElementById("demo").innerHTML=myFunction();
```

在您仅仅希望退出函数时 ，也可使用 return 语句。返回值是可选的

```js
function myFunction(a,b)
{
  if (a>b)
  {
	return;
  }
  x=a+b
}
```

## 局部 JavaScript 变量

在 JavaScript 函数**内部声明的变量（使用 var）是局部变量**，所以**只能在函数内部访问它。（该变量的作用域是局部的）**。

您可以在**不同的函数中使用名称相同的局部变量**，因为**只有声明过该变量的函数才能识别出该变量。**

只要函数**运行完毕**，本地变量**就会被删除**

## 全局 JavaScript 变量

> 在函数外声明的变量是全局变量，**网页上的所有脚本和函数都能访问它**

## JavaScript 变量的生存期

> JavaScript 变量的生命期从它们被**声明的时间开始**。
>
> 局部变量会在函数**运行以后被删除**。
>
> 全局变量会在**页面关闭后被删除**。

## 向未声明的 JavaScript 变量分配值

> 如果您把**值赋给尚未声明的变量**，该变量将被**自动作为 window 的一个属性**

```js
carname="Volvo";
```

将声明 window 的一个属性 carname。

> **非严格模式下给未声明变量赋值创建的全局变量**，是全局对象的可**配置属性，可以删除**

```js
var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性
```

