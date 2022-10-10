> RegExp：是正则表达式（regular expression）的简写。

什么是 RegExp？

## 语法

```js
var patt=new RegExp(pattern,modifiers);

或更简单的方法

var patt=/pattern/modifiers;
```

- 模式描述了一个表达式模型。
- 修饰符(modifiers)描述了检索是否是全局，区分大小写等。

> **注意：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：**

```js
var re = new RegExp("\\w+");
var re = /\w+/;
```

## RegExp 修饰符

修饰符用于执行不区分大小写和全文的搜索。

> i - 修饰符是用来执行不区分大小写的匹配。

> g - 修饰符是用于执行全文的搜索（而不是在找到第一个就停止查找,而是找到所有的匹配）。

```JS
在字符串中不区分大小写找"runoob"
var str = "Visit RUnoob";
var patt1 = /runoob/i;
以下标记的文本是获得的匹配的表达式：
Visit RUnoob
```

```JS
全文查找 "is"
var str="Is this all there is?";
var patt1=/is/g;
以下标记的文本是获得的匹配的表达式：
Is this all there is?
```

```JS
全文查找和不区分大小写搜索 "is"
var str="Is this all there is?";
var patt1=/is/gi;
以下 标记的文本是获得的匹配的表达式：
Is this all there is?
```

## test()

> test()方法搜索字符串指定的值，根据结果并返回真或假。

下面的示例是从字符串中搜索字符 "e" ：

```JS
var patt1=new RegExp("e");
document.write(patt1.test("The best things in life are free"));
由于该字符串中存在字母 "e"，以上代码的输出将是：
true
```

当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）

```JS
var re = new RegExp("\\w+");
```

## exec()

> exec() 方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。

下面的示例是从字符串中搜索字符 "e" ：

```JS
exec() 方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。
下面的示例是从字符串中搜索字符 "e" ：
```

由于该字符串中存在字母 "e"，以上代码的输出将是：

```JS
e
```

 