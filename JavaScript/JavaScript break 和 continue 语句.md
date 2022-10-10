> break 语句用于跳出循环。

> continue 用于跳过循环中的一个迭代

## break 语句

## continue 语句

## JavaScript 标签

> 正如您在 switch 语句那一章中看到的，可以对 **JavaScript 语句进行标记**

如需**标记 JavaScript 语句**，请在**语句之前加上冒号**：

```js
label:

statements
```

break 和 continue 语句**仅仅是能够跳出代码块的语句**

```js
break labelname;

continue labelname;
```

> continue 语句（**带有或不带标签引用**）只能**用在循环中**。

> break 语句（**不带标签引用**），**只能用在循环或 switch 中**。

> 通过**标签引用**，**break 语句可用于跳出任何 JavaScript 代码块**：

```js
cars=["BMW","Volvo","Saab","Ford"];

list:

{

  document.write(cars[0] + "");

  document.write(cars[1] + "");

  document.write(cars[2] + "");

  break list;

  document.write(cars[3] + "");

  document.write(cars[4] + "");

  document.write(cars[5] + "");

}
```

