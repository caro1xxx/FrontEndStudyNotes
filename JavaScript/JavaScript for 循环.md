> 循环可以将代码块执行指定的**次数**

## JavaScript 循环

我们可以这样输出数组的值

```js
for (var i=0;i<cars.length;i++)

{

  document.write(cars[i] + "<br>");

}
```

## 不同类型的循环

JavaScript 支持不同类型的循环

* for - 循环代码块一定的次数

* for/in - 循环遍历对象的属性

* while - 当指定的条件为 true 时循环指定的代码块

* do/while - 同样当指定的条件为 true 时循环指定的代码块

## For 循环

for 循环是您在希望创建循环时常会用到的工具

下面是 for 循环的语法

```js
For 循环

for (语句 1; 语句 2; 语句 3)

{

  被执行的代码块

}
```

语句 1 （代码块）开始前执行

语句 2 定义运行循环（代码块）的条件

语句 3 在循环（代码块）已被执行之后执行

```js
for (var i=0; i<5; i++)

{

   x=x + "该数字为 " + i + "";

}
```

## For/In 循环

JavaScript **for/in 语句循环遍历对象的属性**

```js
var person={fname:"Bill",lname:"Gates",age:56};

for (x in person) // x 为属性名

{

  txt=txt + person[x];

}
```

