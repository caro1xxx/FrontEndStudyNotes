## JavaScript 表单验证

HTML 表单验证可以通过 JavaScript 来完成。

> 以下实例代码用于判断表单字段(fname)值是否存在， 如果不存在，就弹出信息，阻止表单提交

```JS
JavaScript 实例

function validateForm() {

  var x = document.forms["myForm"]["fname"].value;

  if (x == null || x == "") {

     alert("需要输入名字。");

     return false;

  }

}
```

> 以上 JavaScript 代码可以通过 HTML 代码来调用

```JS
HTML 表单实例
<form name="myForm" action="demo_form.php" onsubmit="return validateForm()" method="post">
名字: <input type="text" name="fname">
<input type="submit" value="提交">
</form>
```

## JavaScript 验证输入的数字

JavaScript 常用于对输入数字的验证