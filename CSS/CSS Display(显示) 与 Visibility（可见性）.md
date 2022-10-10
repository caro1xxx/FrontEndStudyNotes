> display属性设置一个元素应如何显示，visibility属性指定一个元素应可见还是隐藏

## 隐藏元素 - display:none或visibility:hidden

> **隐藏一个元素可以通过把display属性设置为"none"**，**或把visibility属性设置为"hidden"**。但是请注意，**这两种方法会产生不同的结果**

> **visibility:hidden可以隐藏某个元素**，但隐藏的元素**仍需占用与未隐藏之前一样的空间**。也就是说，该元素虽然被隐藏了，**但仍然会影响布局**

```css
h1.hidden {visibility:hidden;}
```

> **display:none可以隐藏某个元素**，且隐藏的元素**不会占用任何空间**。也就是说，该元素不但被隐藏了，而且该元素原本**占用的空间也会从页面布局中消失**

```css
h1.hidden {display:none;}
```



## CSS Display - 块和内联元素

> 块元素是一个元素，占用了全部宽度，在前后都是换行符

块元素的例子<h1><p><div>

内联元素只需要必要的宽度，不强制换行

内联元素的例子：<span><a>

## 如何改变一个元素显示

> 可以更改内联元素和块元素，反之亦然，可以使页面看起来是以一种特定的方式组合，并仍然遵循web标准

```css
li {display:inline;}
```

把span元素作为块元素

```css
span {display:block;}
```

