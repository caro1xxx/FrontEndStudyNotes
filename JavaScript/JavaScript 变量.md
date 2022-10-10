> 变量是用于存储信息的"容器"

```js
<script>
var x=5;
var y=6;
var z=x+y;
document.write(x + "
");
document.write(y + "
");
document.write(z + "
");
</script>
```

## JavaScript 变量

* 变量必须以字母开头

* 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）

* 变量名称对大小写敏感（y 和 Y 是不同的变量）

## JavaScript 数据类型

> JavaScript 变量还能保存其他数据类型，比如文本值 (name="Bill Gates")

## 声明（创建） JavaScript 变量

> 使用 var 关键词来声明变量

```js
var carname;
```

变量**声明之后，该变量是空的（它没有值）**

如需向变量赋值，请使用**等号**

```js
carname="Volvo";
```

不过，您也可以在**声明变量时对其赋值**

```js
var carname="Volvo";
```

## 一条语句，多个变量

> 可以在一条语句中**声明很多变量**。该语句以 **var 开头**，并使用**逗号分隔变量即可**

```js
var lastname="Doe", age=30, job="carpenter";
```

声明也可横跨多行

```js
var lastname="Doe",
age=30,
job="carpenter";
```

> **一条语句中声明的多个变量不可以同时赋同一个值**

```js
var x,y,z=1;
```

**x,y 为 undefined， z 为 1**

## Value = undefined

> 在计算机程序中，**经常会声明无值的变量**。**未使用值来声明的变量**，其值实际上是**undefined。**

在执行过以下语句后，变量 carname 的值将是 undefined

```js
var carname;
```

## 重新声明 JavaScript 变量

> 如果**重新声明 JavaScript 变量**，该变量的**值不会丢失**

```js
var carname="Volvo";
var carname;
carname的值依然是Volvo
```

## JavaScript 算数

> 通过 JavaScript 变量来做算数，使用的是 = 和 + 这类运算符

```js
y=5;
x=y+2;
```

## 使用 let 和 const (ES6)

在 2015 年以前，我们使用 var 关键字来声明 JavaScript 变量。

在 2015 后的 JavaScript 版本 (**ES6**) 允许我们使用 **const 关键字**来定义一个**常量**，使用 **let 关键字**定义的**限定范围内作用域的变量**

 

 

 

 