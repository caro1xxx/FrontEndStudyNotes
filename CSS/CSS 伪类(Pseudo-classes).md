> CSS伪类是用来添加一些选择器的特殊效果

## 语法

伪类的语法：

```css
selector:pseudo-class {property:value;}
```

CSS类也可以使用伪类：

```css
selector.class:pseudo-class {property:value;}
```

## anchor伪类

> 在支持 CSS 的浏览器中，链接的不同状态都可以以不同的方式显示

```css
a:link {color:#FF0000;} /* 未访问的链接 */

a:visited {color:#00FF00;} /* 已访问的链接 */

a:hover {color:#FF00FF;} /* 鼠标划过链接 */

a:active {color:#0000FF;} /* 已选中的链接 */
```

> **注意： 在CSS定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。
> 注意： 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。
> 注意：伪类的名称不区分大小写**

## 伪类和CSS类

伪类可以与 CSS 类配合使用：

```css
a.red:visited {color:#FF0000;}

<a class="red" href="css-syntax.html">CSS 语法</a>
```

## CSS :first-child 伪类

您可以使用 :first-child 伪类来选择父元素的第一个子元素

> 注意：**在IE8的之前版本必须声明<!DOCTYPE> **，这样 :first-child 才能生效

## 匹配第一个` <p> `元素

在下面的例子中，选择器匹配作为任何元素的第一个子元素的 <p> 元素

```css
p:first-child

{

  color:blue;

}
```

匹配所有<p> 元素中的第一个 <i> 元素

在下面的例子中，选择相匹配的所有<p>元素的第一个 <i> 元素：

```css
p > i:first-child

{

  color:blue;

}
```

## 匹配所有作为第一个子元素的 `<p> `元素中的所有 `<i> `元素

在下面的例子中，选择器匹配所有作为元素的第一个子元素的 <p> 元素中的所有 <i> 元素

```css
p:first-child i

{

  color:blue;

}
```

## CSS - :lang 伪类

> :lang 伪类使你有能力为不同的语言定义特殊的规则

> 注意：IE8必须声明<!DOCTYPE>才能支持;lang伪类。

在下面的例子中，:lang 类为属性值为 no 的q元素定义引号的类型

```css
q:lang(no) {quotes: "~" "~";}
```

![img](CSS 伪类(Pseudo-classes).assets/wps23.jpg)![img](CSS 伪类(Pseudo-classes).assets/wps24.png) 

![img](CSS 伪类(Pseudo-classes).assets/wps25.jpg)

