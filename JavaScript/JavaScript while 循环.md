只要指定条件为 true，循环就可以一直执行代码块

## while 循环

> while 循环会在指定条件**为真时循环执行代码块**

语法

```js
while (条件)

{

  需要执行的代码

}
```

本例中的循环将继续运行，只要变量 i 小于 5

```js
while (i<5)

{

  x=x + "The number is " + i + "

";

  i++;

}
```

## do/while 循环

> do/while 循环是 **while 循环的变体**。该循环会在检查条件**是否为真之前执行一次代码块**，然后如果条件为**真**的话，就**会重复这个循环**

```js
do

{

  需要执行的代码

}

while (条件);
```

实例

```js
do

{

  x=x + "The number is " + i + "";

  i++;

}

while (i<5);
```

