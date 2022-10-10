> HTML 中的脚本必须位于 <script> 与 </script> 标签之间

## `<script>`标签

HTML 中的脚本必须位于 `<script>` 与 `</script> `标签之间

`<script>` 和 `</script> `会告诉 JavaScript 在何处开始和结束

`<script>`` 和 ``</script>` 之间的代码行包含了 JavaScript:

```js
<script>
    alert("我的第一个javascript");  分号结尾，alert作用是浏览器会弹出通知窗口 
</script>
```

> **注意：那些老旧的实例可能会在 <script> 标签中使用 type="text/javascript"。现在已经不必这样做了。JavaScript 是所有现代浏览器以及 HTML5 中的默认脚本语言**

## `<body>` 中的 JavaScript

JavaScript 会在页面加载时向 HTML 的 <body> 写文本：

```js
<!DOCTYPE html>
<html>
<body>
.
.
<script>
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落</p>");
</script>
.
.
</body>

</html>
```

## JavaScript 函数和事件

> 上面例子中的 JavaScript 语句，会在页面加载时执行。

> 通常，我们需要在某个事件发生时执行代码，比如当用户点击按钮时。
> 如果我们把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数

## 在 `<head>` 或者 `<body>` 的JavaScript

> 您可以在 HTML 文档中放入不限数量的脚本。

> **脚本可位于 HTML 的 <body> 或 <head> 部分中，或者同时存在于两个部分中。**

> **通常的做法是把函数放入 <head> 部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容**

## `<head>` 中的 JavaScript 函数

```js
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>javascript</title>
<script>
function myfunction(){
  document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
}
</script>   
</head>
<body>
<p id="demo">一个段落。</p>
<button type="button" onclick="myfunction()">点击这里</button>
</body>
</html>
该函数会在点击按钮时被调用
```

## 外部的 JavaScript

> 也可以把脚本保存到外部文件中。外部文件通常包含被多个网页使用的代码。
>
> 外部 JavaScript 文件的文件扩展名是 .js。
>
> 如需使用外部文件，请在 <script> 标签的 "src" 属性中设置该 .js 文件

> **外部脚本不能包含 <script> 标签， 直接写 javascript 代码**

## 细节

> **HTML 输出流中使用 document.write，相当于添加在原有html代码中添加一串html代码。而如果在文档加载后使用（如使用函数），会覆盖整个文档**

 

