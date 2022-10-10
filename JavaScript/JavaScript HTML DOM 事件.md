> HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应

## 对事件做出反应

> 我们可以在事件发生时执行 JavaScript，比如当用户在 HTML 元素上点击时。

> 如需在用户点击某个元素时执行代码，请向一个 HTML 事件属性添加 JavaScript 代码

```JS
onclick=JavaScript
```

HTML 事件的例子:

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

当用户在 <h1> 元素上点击时，会改变其内容：

```JS
<body>

<h1 onclick="this.innerHTML='Ooops!'">点击文本!</h1>

</body>
```

从事件处理器调用一个函数：

```JS
<head>
<script>
function changetext(id)
{
  id.innerHTML="Ooops!";
}
</script>
</head>
<body>
<h1 onclick="changetext(this)">点击文本!</h1>
</body>
```

## HTML 事件属性

> 如需向 HTML 元素分配 事件，您可以使用事件属性

```JS
向 button 元素分配 onclick 事件：
<button onclick="displayDate()">点这里</button>
在上面的例子中，名为 displayDate 的函数将在按钮被点击时执行
```

## 使用 HTML DOM 来分配事件

> HTML DOM 允许您使用 JavaScript 来向 HTML 元素分配事件：

```JS
向 button 元素分配 onclick 事件：
<script>
document.getElementById("myBtn").onclick=function(){displayDate()};
</script>
```

> 上面的例子中，名为 displayDate 的函数被分配给 id="myBtn" 的 HTML 元素。

按钮点击时Javascript函数将会被执行

## onload 和 onunload 事件

> onload 和 onunload 事件会在用户进入或离开页面时被触发。
>
> onload 事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本。
>
> onload 和 onunload 事件可用于处理 cookie。

```JS
</head>
<body onload="checkCookies()">
<script>
function checkCookies(){
  if (navigator.cookieEnabled==true){
    alert("Cookies 可用")
  }
  else{
    alert("Cookies 不可用")
  }
}
</script>
</body>
```

## onchange 事件

> onchange 事件常结合对输入字段的验证来使用。

下面是一个如何使用 onchange 的例子。当用户改变输入字段的内容时，会调用 upperCase() 函数。

```JS
<input type="text" id="fname" onchange="upperCase()">
```

## onmouseover 和 onmouseout 事件

> onmouseover 和 onmouseout 事件可用于在用户的鼠标移至 HTML 元素上方或移出元素时触发函数。

<body>

```JS
<div onmouseover="mOver(this)" onmouseout="mOut(this)" style="background-color:#D94A38;width:120px;height:20px;padding:40px;">Mouse Over Me</div>
<script>
function mOver(obj){
  obj.innerHTML="Thank You"
}
function mOut(obj){
  obj.innerHTML="Mouse Over Me"
}
</script>
</body>
```

## onmousedown、onmouseup 以及 onclick 事件

onmousedown, onmouseup 以及 onclick 构成了鼠标点击事件的所有部分。首先当点击鼠标按钮时，会触发 onmousedown 事件，当释放鼠标按钮时，会触发 onmouseup 事件，最后，当完成鼠标点击时，会触发 onclick 事件

