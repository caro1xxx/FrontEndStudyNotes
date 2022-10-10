> 所有的 JavaScript 项目适用同一种规范

## JavaScript 代码规范

代码规范通常包括以下几个方面:

- 变量和函数的命名规则
- 空格，缩进，注释的使用规则。
- 其他常用规范……

## 变量名

> 变量名推荐使用驼峰法来命名(camelCase)

```JS
firstName = "John";

lastName = "Doe";
```

## 空格与运算符

> 通常运算符 ( = + - * / ) 前后需要添加空格

```JS
var x = y + z;

var values = ["Volvo", "Saab", "Fiat"];
```

## 代码缩进

> 通常使用 4 个空格符号来缩进代码块

```JS
function toCelsius(fahrenheit) {

  return (5 / 9) * (fahrenheit - 32);

}
```

## 语句规则

> 简单语句的通用规则

- 一条语句通常以分号作为结束符

```JS
var values = ["Volvo", "Saab", "Fiat"];

var person = {

  firstName: "John",

  lastName: "Doe",

  age: 50,

  eyeColor: "blue"

};
```

复杂语句的通用规则:

- 将左花括号放在第一行的结尾。
- 左花括号前添加一空格。
- 将右花括号独立放在一行。
- 不要以分号结束一个复杂的声明

## 对象规则

对象定义的规则

- 将左花括号与类名放在同一行。
- 冒号与属性值间有个空格。
- 字符串使用双引号，数字不需要。
- 最后一个属性-值对后面不要添加逗号。
- 将右花括号独立放在一行，并以分号作为结束符号。

> 短的对象代码可以直接写成一行:

```JS
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```

> **每行代码字符小于 80**

## 命名规则

一般很多代码语言的命名规则都是类似的，例如

- 变量和函数为小驼峰法标识, 即除第一个单词之外，其他单词首字母大写（ lowerCamelCase）
- 全局变量为大写 (UPPERCASE )
- 常量 (如 PI) 为大写 (UPPERCASE )

## HTML 载入外部 JavaScript 文件

> 使用简洁的格式载入 JavaScript 文件 ( type 属性不是必须的):

```JS
<script src="myscript.js">
```

## 文件扩展名

> HTML 文件后缀可以是 .html (或 .htm)。
>
> CSS 文件后缀是 .css 。
>
> JavaScript 文件后缀是 .js

## 使用小写文件名

大多 Web 服务器 (Apache, Unix) 对大小写敏感： london.jpg 不能通过 London.jpg 访问。

其他 Web 服务器 (Microsoft, IIS) 对大小写不敏感： london.jpg 可以通过 London.jpg 或 london.jpg 访问。

> 你必须保持统一的风格，我们建议统一使用小写的文件名

 