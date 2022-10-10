> 通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面

iframe语法:

```html
<iframe src="URL"></iframe>
该URL指向不同的网页
```

## Iframe - 设置高度与宽度

> **height** 和 **width** 属性用来定义iframe标签的**高度与宽度**

> **属性默认以像素为单位**, 但是你可以指定**其按比例显示** (如："80%")

```html
<iframe loading="lazy" src="123.html" width="100" height="100"></iframe>
```

## Iframe - 移除边框

> frameborder 属性用于定义iframe表示是否显示边框。

> 设置属性值为 **"0" 移除iframe的边框**

```html
<iframe loading="lazy" src="123.html" frameborder="0" width="100" height="100"></iframe>
```

## 使用iframe来显示目标链接页面

> iframe可以显示一个目标链接的页面

> **目标链接的属性必须使用iframe的属性**

