## HTML `<head>` 元素

> `<head>` 元素包含了所有的头部标签元素。**在 `<head>`元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。**

可以添加在头部区域的元素标签为: <title>, <style>, <meta>, <link>, <script>, <noscript> 和 <base>

## HTML` <title>` 元素

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>文档标题</title>
</head>
<body>
文档内容......
</body>
</html>
```

## HTML` <base> `元素

> `<base> `标签描述了基本的链接地址/链接目标，该标签作为HTML文档中所有的链接标签的默认链接:

```html
<head>
<base href="http://www.runoob.com/images/" target="_blank">
</head>
```

## HTML` <link> `元素

> <link> 标签定义了文档与外部资源之间的关系

<link> 标签通常用于链接到样式表:

```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

## HTML` <style> `元素

> `<style>` 标签定义了HTML文档的样式文件引用地址.**在`<style> `元素中你也可以直接添加样式来渲染 HTML 文档**

```html
<head>
<style type="text/css">
body {background-color:yellow}
p {color:blue}
</style>
</head>
```

## HTML `<meta> `元素

> meta标签描述了一些基本的元数据。

> `<meta>` 标签提供了元数据.元数据也不显示在页面上，**但会被浏览器解析**。META 元素通常用于**指定网页的描述，关键词，文件的最后修改时间，作者，和其他元数据。**

> 元数据可以使用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他Web服务。

> `<meta>` 一般放置于 `<head> `区域

```html
为搜索引擎定义关键词:
<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
每30秒钟刷新当前页面:
<meta http-equiv="refresh" content="30">
```

## HTML` <script>` 元素

> **`<script>`标签用于加载脚本文件，如： JavaScript**

