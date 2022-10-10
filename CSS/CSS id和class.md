## id 和 class 选择器

> 如果你要在HTML元素中设置CSS样式，你需要在元素中设置"id" 和 "class"选择器

## id 选择器

> id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式

> HTML**元素以id属性**来**设置id选择器**,CSS 中**id 选择器以 "#" 来定义**

```css
#para1
{
    text-align:center;
    color:red;
}
```

> **ID属性不要以数字开头，数字开头的ID在 Mozilla/Firefox 浏览器中不起作用**

## class 选择器

> class 选择器用于描述一组元素的样式，class 选择器有别于id选择器，**class可以在多个元素中使用**

>  class 选择器在HTML中以class属性表示, 在 CSS 中，**类选择器以一个点"."号显示**

```css
.center {text-align:center;}
```

你也可以指定特定的HTML元素使用class

在以下实例中, 所有的 p 元素使用 class="center" 让该元素的文本居中

```css
p.center {text-align:center;}
```

> **类名的第一个字符不能使用数字！它无法在 Mozilla 或 Firefox 中起作用**

