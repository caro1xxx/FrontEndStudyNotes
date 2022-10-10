> CSS (Cascading Style Sheets)**用于渲染HTML元素标签的样式**

## 如何使用CSS

> CSS 是在 HTML 4 开始使用的,是为了更好的渲染HTML元素而引入的.

CSS 可以通过以下方式添加到HTML中:

```html
内联样式- 在HTML元素中使用"style" 属性
内部样式表 -在HTML文档头部 <head> 区域使用<style> 元素 来包含CSS
外部引用 - 使用外部 CSS 文件
```

## 内联样式

> 当特殊的样式**需要应用到个别元素时**，就可以使用内联样式。 使用内联样式的方法是在相关的标签中使用样式属性。样式属性可以包含任何 CSS 属性。以下实例显示出如何改变段落的颜色和左外边距

```html
<p style="color:blue;mragin-left:20px">这是一个段落</p>
```

## 内部样式表

> **当单个文件需要特别样式时**，就可以使用内部样式表。你可以在<head> 部分通过 <style>标签定义内部样式表:

```html
<head>
<style type="text/css">
body {background-color:yellow;}
p {color:blue;}
</style>
</head>
```

## 外部样式表

> **当样式需要被应用到很多页面的时候**，外部样式表将是理想的选择。使用外部样式表，你就可以通过更改一个文件来改变整个站点的外观

```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

> CSS修饰标签的样式，**有 "内联" 和 "外引" 两种方式。**

> 对于大部分标签，以上两种方法均可，且修改父级标签，子级标签特性也会改变。但某些标签确无法通过修改父级标签来改变子级标签特性，如a标签，修改其颜色特性，必须直接修改 a 标签的特性才可。

```html
<a href="#" style="color:red;" rel="nofollow">只能使用"内联"方式</a>
```

