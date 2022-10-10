> 条件语句用于基于不同的条件来执行不同的动作

## 条件语句

在 JavaScript 中，我们可使用以下条件语句：

* if 语句 - 只有当指定条件为 true 时，使用该语句来执行代码

* if...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码

* if...else if....else 语句- 使用该语句来选择多个代码块之一来执行

* switch 语句 - 使用该语句来选择多个代码块之一来执行

## if 语句

> 只有当指定条件为 true 时，该语句才会执行代码

```js
if (condition)

{

  当条件为 true 时执行的代码

}
```

当时间小于 20:00 时，生成问候 "Good day"

```js
if (time<20)

{

  x="Good day";

}
```

## if...else 语句

> 请使用 if....else 语句在条件为 true 时执行代码，在条件为 false 时执行其他代码

语法

```js
if (condition)

{

  当条件为 true 时执行的代码

}

else

{
    当条件不为 true 时执行的代码

}
```

## if...else if...else 语句

语法

```js
if (condition1)

{

  当条件 1 为 true 时执行的代码

}

else if (condition2)

{

  当条件 2 为 true 时执行的代码

}

else

{

 当条件 1 和 条件 2 都不为 true 时执行的代码

}
```

