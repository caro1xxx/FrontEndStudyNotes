> JavaScript **对象是拥有属性和方法的数据**
>
> 在 JavaScript中，**几乎所有的事物都是对象**
>
> JavaScript **对象是变量的容器**

## 对象定义

你可以使用字符来定义和创建 JavaScript 对象

```js
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```

定义 JavaScript 对象可以跨越多行，空格跟换行不是必须的

```js
var person = {
  firstName:"John",
  lastName:"Doe",
  age:50,
  eyeColor:"blue"
};
```

## 对象属性

可以说** "JavaScript 对象是变量的容器"**

但是，我们通常认为 "JavaScript **对象是键值对的容器"**

键值对通常**写法为 name : value (键与值以冒号分割)**

键值对在 JavaScript 对象**通常称为 对象属性**

对象键值对的写法类似于：**Python 中的字典**

## 访问对象属性

> 你可以通过两种方式访问对象属性

```js
person.lastName;
person["lastName"];
```

## 对象方法

对象的方法定义了一个函数，并作为对象的属性存储

对象方法通过添加 () 调用 (作为一个函数)

该实例访问了 person 对象的 fullName() 方法

```js
<p id="demo"></p>
<script>
    var person = {
  firstName: "John",
  lastName : "Doe",
  id : 5566,
  fullName : function()
  {
  return this.firstName + " " + this.lastName;
  }
};
document.getElementById("demo").innerHTML = person.fullName();
</script>
```

> 如果你要访问 person 对象的 fullName 属性，它将作为一个定义函数的字符串返回

```js
document.getElementById("demo1").innerHTML = "不加括号输出函数表达式：" + person.fullName;
document.getElementById("demo2").innerHTML = "加括号输出函数执行结果：" + person.fullName();
```

## 访问对象方法

你可以使用以下语法创建对象方法

```js
methodName : function() {
  // 代码
}
```

使用以下语法访问对象方法

```js
objectName.methodName()
```

> 通常 **fullName()** 是**作为 person 对象的一个方法**， fullName 是**作为一个属性。**

> 如果使用 fullName 属性，**不添加 (), 它会返回函数的定义**

```js
objectName.methodName
```



 

