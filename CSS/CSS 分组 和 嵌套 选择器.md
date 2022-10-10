## 分组选择器

> 在样式表中有很多具有相同样式的元素

```css
h1 {

  color:green;

}

h2 {

  color:green;

}

p {

  color:green;

}
```



> 为了尽量减少代码，你可以**使用分组选择器。**

> **每个选择器用逗号分隔**

我们对以上代码使用分组选择器

```css
h1,h2,p

{

  color:green;

}
```



## 嵌套选择器

> 它可能适用于选择器内部的选择器的样式。

在下面的例子设置了四个样式：

* p{ }: 为所有 p 元素指定一个样式。

* .marked{ }: 为所有 class="marked" 的元素指定一个样式。

* .marked p{ }: 为所有 class="marked" 元素内的 p 元素指定一个样式。

* p.marked{ }: 为所有 class="marked" 的 p 元素指定一个样式。

