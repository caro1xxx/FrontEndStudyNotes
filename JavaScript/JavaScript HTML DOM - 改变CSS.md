> HTML DOM 允许 JavaScript 改变 HTML 元素的样式

## 改变 HTML 样式

```JS
document.getElementById(id).style.property=新样式
```

下面的例子会改变 <p> 元素的样式：

```JS
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<p id="p1">Hello World!</p>
<p id="p2">Hello World!</p>
<script>
document.getElementById("p2").style.color="blue";
document.getElementById("p2").style.fontFamily="Arial";
document.getElementById("p2").style.fontSize="larger";
</script>

</body>
</html>
```

## 使用事件

> HTML DOM 允许我们通过触发事件来执行代码

本例改变了 id="id1" 的 HTML 元素的样式，当用户点击按钮时

```JS
<!DOCTYPE html>
<html>
<body>
<h1 id="id1">我的标题 1</h1>
<button type="button"
onclick="document.getElementById('id1').style.color='red'">
点我!</button>

</body>
</html>
```

