> 不同的链接可以有不同的样式

## 链接样式

> 链接的**样式**，可以用**任何CSS属性**（如颜色，字体，背景等）

> 特别的链接，可以有不同的样式，这取决于他们是什么状态

四个链接状态是

* `a:link `- 正常，未访问过的链接
* `a:visited` - 用户已访问过的链接
* `a:hover` - 当用户鼠标放在链接上时
* `a:active` - 链接被点击的那一刻

> 当设置为若干链路状态的样式，也有一些顺序规则

> **a:hover 必须跟在 a:link 和 a:visited后面
>
> a:active 必须跟在 a:hover后面**

## 文本修饰

> **text-decoration **属性主要用于**删除链接中的下划线**

```css
a:link {text-decoration:none;}
a:visited {text-decoration:none;}
a:hover {text-decoration:underline;}
a:active {text-decoration:underline;}
```

## 背景颜色

> 背景颜色属性指定链接背景色

```css
a:link {background-color:#B2FF99;}
```

