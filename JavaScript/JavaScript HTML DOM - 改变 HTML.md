## 改变 HTML 输出流

> JavaScript 能够创建动态的 HTML 内容：

今天的日期是： Tue Jun 15 2021 19:47:14 GMT+0800 (中国标准时间)

> 在 JavaScript 中，document.write() 可用于直接向 HTML 输出流写内容。

> **绝对不要在文档(DOM)加载完成之后使用 document.write()。这会覆盖该文档**

## 改变 HTML 内容

> 修改 HTML 内容的最简单的方法是使用 innerHTML 属性

```JS
document.getElementById(id).innerHTML=新的 HTML
```

## 改变 HTML 属性

```JS
document.getElementById(id).attribute=新属性值
```

实例

```JS
<img id="image" src="smiley.gif">
<script>
document.getElementById("image").src="landscape.jpg";
</script>
```

上面的 HTML 文档含有 id="image" 的 <img> 元素

我们使用 HTML DOM 来获得 id="image" 的元素

JavaScript 更改此元素的属性（把 "smiley.gif" 改为 "landscape.jpg"）

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 