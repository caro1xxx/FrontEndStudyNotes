> CSS 背景属性用于定义HTML元素的背景

> CSS 属性定义背景效果

```html
background-color
background-image
background-repeat
background-attachment
background-position
```

## 背景颜色

> background-color 属性定义了元素的背景颜色

页面的背景颜色使用在body的选择器中:

```css
body {background-color:#b0c4de;}
```

CSS中，颜色值通常以以下方式定义

* 十六进制 - 如："#ff0000"
* RGB - 如："rgb(255,0,0)"
* 颜色名称 - 如："red"

以下实例中, h1, p, 和 div 元素拥有不同的背景颜色

```css
h1 {background-color:#6495ed;}
p {background-color:#e0ffff;}
div {background-color:#b0c4de;}
```

## 背景图像

> **background-image 属性**描述了元素的**背景图像**
> 默认情况下，背景图像进行平铺重复显示，以**覆盖**整个元素实体

```css
body {background-image:url('paper.gif');}
```

## 背景图像 - 水平或垂直平铺

> 默认情况下 **background-image** 属性会在页面的水平或者垂直方向平铺

```css
body
{
background-image:url('gradient2.png');
}
```

## 背景图像- 设置定位与不平铺

> 让背景图像不影响文本的排版
> 如果你不想让图像平铺，你可以使用 **background-repeat 属性**

```css
body
{
background-image:url('img_tree.png');
background-repeat:no-repeat;
}
```

