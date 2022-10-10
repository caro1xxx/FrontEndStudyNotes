> Partol:组件默认会按照既定层次嵌套渲染，该元素会被挂载到DOM元素中离其最近的父节点

> Portal 提供了一种将**子节点渲染到存在于父组件以外的 DOM 节点**的优秀的方案

> 即Partol可以让子元素渲染到root节点之外的节点,但是在书写代码时还是写在App组件下

```tsx
//Partol.tsx
import React from "react";
//引入ReactDOM,partol需要
import ReactDOM from "react-dom";
import Child from "../Child";
type Props = {};

const Index = (props: Props) => {
  //createPortal接受一个组件和一个DOM元素,这个DOM元素就是用于挂载的父节点
  return ReactDOM.createPortal(
    <Child />,
    document.getElementById("container")!
  );
};

export default Index;
```

```html
//public/index.html
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
//用于挂载的节点
<div id="container"></div>
```

```tsx
//child.tsx
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return <div>模态框/加载框/进度条/dailog之类的弹出层</div>;
};

export default Index;
```

```tsx
//app.tsx
...
<div>
  <Portal></Portal>
</div>
...
```

> 这样一来child组件就不受父组件的影响,即便父组件是dispaly:none或者hidden,child组件也会正常显示,因为本来就脱离了root节点的控制,所以partol非常是否写弹出层之类的东西