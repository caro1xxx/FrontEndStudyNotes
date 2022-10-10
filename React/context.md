> context主要是用于传播props,在遇到很深层次的props时,就可以使用context进行传递,而无需一层层传递props

#### 方法1:全局context

> Provider -- Consumer

> 新建context.js, 用于将context定义在全局

```tsx
import { createContext } from "react";

export const MyContext = createContext("light");
```

> 在顶层组件使用

```tsx
import React, { createContext, useState } from "react";
import User from "./User";
import Toolbar from "./Toolbar";
//引入全局context
import { MyContext } from "./context";
import "./App.css";

function App() {
  let [value, setValue] = useState("light");

  //改变状态,context状态随之改变
  const changeValue = (v: string) => {
    setValue((value = v));
  };

  return (
    <div>
      <button
        onClick={() => {
          changeValue("dark");
        }}
      >
        change
      </button>
      //这个value就是在context中的value,会传递给下面的组件
      <MyContext.Provider value={value}>
        <User></User>
        <Toolbar></Toolbar>
      </MyContext.Provider>
    </div>
  );
}

export default App;
```

> 使用到的组件

```tsx
//User.tsx
import React from "react";
//引入全局context
import { MyContext } from "../context";
type Props = {};

const Index = (props: Props) => {
  return (
    <MyContext.Consumer>
      //这里面一定是一个函数,并且return出来一个元素,这个元素的txt需要使用JSON.stringify解析,这里解析的value就是context中的
      {(value) => {
        return <div>第一种使用Context方式获取的值:{JSON.stringify(value)}</div>;
      }}
    </MyContext.Consumer>
  );
};

export default Index;
```

#### 方法2:React.createContext提供的Provider和useContext钩子

> 导入`useContext`钩子函数,该函数接收`createContext()`的返回值,返回的结果为该`context`的当前值

> 当前的 `context` 值**由上层组件中距离当前组件最近**的 `<MyContext.Provider>` 的 `value prop` 决定

```tsx
import React, { useContext } from "react";
//引入全局context
import { MyContext } from "../context";
type Props = {};

const Index = (props: Props) => {
  //useConetxt获取MyContext中的值
  //这里useContext获取的值,是由上层中距离当前组件最近的<MyContext.Provider>的value决定的,现在即是App组件
  const context = useContext(MyContext);
	//这里不再需要函数获取值了,直接JSON解析即可
  return <div>{JSON.stringify(context)}</div>;
};

export default Index;
```

#### 方法3:React.createContext提供的Provider和class的contextType属性

> class组件使用

> 使用`static`关键字添加静态属性，和直接在`class`添加属性效果一致,最终都会添加到类上，而不是类的实例上

```tsx
import React, { Component } from "react";
import { MyContext } from "../context";

class ClassC extends Component {
  static contextType = MyContext;
  render() {
    const value = this.MyContext;
    return <div>第三种使用Context方式获取的值：{JSON.stringify(value)}</div>;
  }
}

export default ClassC;
```

