> Ref转发是一项将ref自动地通过组件传递到其一子组件的技巧(允许某些组件接收ref，并**将其向下传递给子组件).**

> FunctionButton使用React.forwardRef来获取传递给它的ref，然后转发到它渲染的DOM Button

```jsx
//3.React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数
const FancyButton = React.forwardRef((props, ref) => (
  //4.我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性
    <button ref={ref}>{props.children}</button>
  //5.当 ref 挂载完成，ref.current 将指向 <button> DOM 节点
))

//1.可以直接获取DOM button的ref
const ref = React.createRef();
//2.将ref作为属性传递给FancyButton
<FancyButton ref={ref}>click me</FancyButton>
```

> 所以说组成触发的其实是FancyButton中的button