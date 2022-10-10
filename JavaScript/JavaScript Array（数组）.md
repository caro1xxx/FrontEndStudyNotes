> 数组对象的作用是：使用单独的变量名来存储一系列的值

## 什么是数组?

> 数组对象是使用单独的变量名来存储一系列的值。

如果你有一组数据（例如：车名字），存在单独变量如下所示：

```JS
var car1="Saab";
var car2="Volvo";
var car3="BMW";
```

## 创建一个数组

> 创建一个数组，有三种方法。

下面的代码定义了一个名为 myCars的数组对象：

1: 常规方式:

```JS
var myCars=new Array();
myCars[0]="Saab";   
myCars[1]="Volvo";
myCars[2]="BMW";
```

2: 简洁方式:

```JS
var myCars=new Array("Saab","Volvo","BMW");
```

3: 字面:

```JS
var myCars=["Saab","Volvo","BMW"];
```

## 访问数组

> 通过指定数组名以及索引号码

```JS
var name=myCars[0];
```

## 在一个数组中你可以有不同的对象

> 所有的JavaScript变量都是对象。数组元素是对象。函数是对象。

> 因此，你可以在数组中有不同的变量类型

> 你可以在一个数组中包含对象元素、函数、数组：

```js
myArray[0]=Date.now;
myArray[1]=myFunction;
myArray[2]=myCars;
```

## 数组方法和属性

> 使用数组对象预定义属性和方法：

```js
var x=myCars.length       // myCars 中元素的数量
var y=myCars.indexOf("Volvo")  // "Volvo" 值的索引值
```

## 创建新方法

> 原型是JavaScript全局构造函数。它可以构建新Javascript对象的属性和方法

```js
Array.prototype.myUcase=function(){
  for (i=0;i<this.length;i++){
   this[i]=this[i].toUpperCase();
  }
}
```

 