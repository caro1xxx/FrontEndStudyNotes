日期对象用于处理日期和时间

## 创建日期

Date 对象用于处理日期和时间。

> 可以通过 new 关键词来定义 Date 对象。以下代码定义了名为 myDate 的 Date 对象：

> 有四种方式初始化日期:

```JS
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

> 上面的参数大多数都是可选的，在不指定的情况下，默认参数是0。

实例化一个日期的一些例子：

```JS
var today = new Date()
var d1 = new Date("October 13, 1975 11:13:00")
var d2 = new Date(79,5,24)
var d3 = new Date(79,5,24,11,33,0)
```

## 设置日期

通过使用针对日期对象的方法，我们可以很容易地对日期进行操作。

在下面的例子中，我们为日期对象设置了一个特定的日期 (2010 年 1 月 14 日)：

```JS
var myDate=new Date();
myDate.setFullYear(2010,0,14);
```

我们将日期对象设置为 5 天后的日期：

```JS
var myDate=new Date();
myDate.setDate(myDate.getDate()+5);
```

> **注意: 如果增加天数会改变月份或者年份，那么日期对象会自动完成这种转换。**

## 两个日期比较

日期对象也可用于比较两个日期。

```JS
var x=new Date();
x.setFullYear(2100,0,14);
var today = new Date();

if (x>today)
{
  alert("今天是2100年1月14日之前");
}
else
{
  alert("今天是2100年1月14日之后");
}
```

 

