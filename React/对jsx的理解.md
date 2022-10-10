#### jsx的本质

> jsx的本质:JavaScript的**语法扩展**

> jsx是JavaScript的语法扩展,和**模板语言**很接近,但是它**充分具备JavaScript的能力**

> 既然jsx是JavaScript的语法扩展,那么jsx注定就不会被浏览器所认识,那么究竟是谁把jsx翻译过来的呢,其实是bebal,**bebal充当翻译官的功能**,jsx会被编译为**React.createElement()**,并且React.createElement**返回一个"React Element"的JS对象**

#### bebal

> Bebal:是一个工具链,主要是将ECMAScript2015+的版本的代码**转换为向后兼容的JavaScript语法**,使其被浏览器所认识

#### 为什么不直接使用React.createElement()

> **jsx相当于React.createElement的语法糖**,之所以react官方推崇jsx,是在代码及其多的情况,如果使用react.createElement会使开发者在编写代码时付出更多的时间,并且不易维护,相比之下,jsx比React.createElement更加简洁,可读性高

#### jsx是如何映射为DOM的

```react
export function createElement(type,config,children)
//type:节点类型,如<h1>,<组件名>等
//config:以对象形式传入,组件所有的属性都会以键值对的形式存储在config对象中
//children:以对象形式传入,记录的是组件标签之间嵌套的内容,所谓的子节点,子元素
例子:
React.createElement('ul',{
    classNmae:'list'
},React.createElement('li',{
    key:'1'
},'1'),ReactcreateElement('li',{
    key:'2'
},'2'))
//对应DOM
<ul className="list">
    <li key="1">1</li>
	<li key="2">2</li>
</ul>
```

![image-20211209183537339](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211209183537339.png)

#### ReactDOM.render()

```react
ReactDOM.render(
    //需要渲染的元素(ReactElement)
	element,
    //元素挂载的目标容器(一个真是dom)
    container,
    //回调函数,可选参数,可以用来处理渲染结束后的逻辑
    [ballback]
)
```

#### 总结

![image-20211209183919839](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211209183919839.png)



























































