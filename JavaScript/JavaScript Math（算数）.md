## Math 对象

> Math（算数）对象的作用是：执行普通的算数任务。

> Math 对象提供多种算数值类型和函数。无需在使用这个对象之前对它进行定义

使用 Math 的属性/方法的语法：

```JS
var x=Math.PI;
var y=Math.sqrt(16);
```

> **注意： Math对象无需在使用这个对象之前对它进行定义。**

## 算数值

JavaScript 提供 8 种可被 Math 对象访问的算数值：

你可以参考如下 Javascript 常量使用方法：

```JS
Math.E
Math.PI
Math.SQRT2
Math.SQRT1_2
Math.LN2
Math.LN10
Math.LOG2E
Math.LOG10E
```

## 算数方法

除了可被 Math 对象访问的算数值以外，还有几个函数（方法）可以使用。

> 下面的例子使用了 Math 对象的 round 方法对一个数进行四舍五入。

```JS
document.write(Math.round(4.7));
输出:5
```

> 使用了 Math 对象的 random() 方法来返回一个介于 0 和 1 之间的随机数：

```JS
document.write(Math.random());
输出：0.8599185575994159
```

Math 对象的 floor() 方法和 random() 来返回一个介于 0 和 11 之间的随机数：

```JS
document.write(Math.floor(Math.random()*11));
```

 

 

 