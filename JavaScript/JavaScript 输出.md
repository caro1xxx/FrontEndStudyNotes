> JavaScript 没有任何打印或者输出的函数

## JavaScript 显示数据

JavaScript 可以通过不同的方式来输出数据

* 使用 window.alert() 弹出警告框。

* 使用 document.write() 方法将内容写到 HTML 文档中。

* 使用 innerHTML 写入到 HTML 元素。

* 使用 console.log() 写入到浏览器的控制台。

## 使用 window.alert()

```javascript
<script>
    window.alert(1+1)
</script>
```

## 操作 HTML 元素

> 如需从**JavaScript 访问某个 HTML 元素**，您可以**使用 document.getElementById(id) 方法**

请使用 "id" 属性来标识 HTML 元素，并 innerHTML 来获取或插入元素内容

写到 HTML 文档

```javascript
<script>
document.write(Date())
</script>
```

请使用 document.write() 仅仅向文档输出写内容。

> **如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖。**

## 写到控制台

如果您的浏览器支持调试，你可以使用 console.log() 方法在浏览器中显示 JavaScript 值

 ```js
 <script>
 a = 5;
 b = 6;
 c = a + b;
 console.log(c);
 </script>
 ```

