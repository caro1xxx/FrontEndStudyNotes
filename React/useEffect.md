> useEffect hook就是函数组件的生命周期函数，相当于class中的componentDidMount和componentDidUpdate，在特定的时候执行这个副作用，在useEffect中的就是会执行的副作用

> 注意:一个useEffect就像一个副作用，当给定的依赖发生变化，那么执行完副作用后马上就会执行清除，后又启用另外一个useEffect

```react
import {useState,useEffect} from 'react'
function About(props) {

    const [count, setCount] = useState(0);
  
    const handler = () => {
        setCount(count+1)
    }

    useEffect(() => {
      //在count这个以来发生变化的时候，useEffect将会触发并且携带副作用
        document.title = `you click ${count}`;
    });

    return (
        <div>
            11
            {count}
            <button onClick={handler}>click</button>
            <div>{props.name}</div>
        </div>
    );
}

export default About;

```

> 有些事件是需要清除的，比如订阅的绑定等，那么使用useEffect怎么卸载绑定呢，这里useEffect一个hook可以干两件事

1. 触发副作用
2. 卸载副作用

```react
useEffect(() => {
        document.title = `you click ${count}`;
  			//这里返回一个函数，这个函数就会在这个useEffect卸载时被触发，返回的函数自定义
        return function clearup(){
                  console.log("clear")
              }
    });
```

> 返回的函数执行时机就相当于componentWillUnmount

#### 性能问题

> 现在知道了，每次useEffect都会运行和清除，那么随之而来的就是性能问题，我们可以给useEffect提供第二个参数，仅在第二个参数发生变化的时候才会运行Effect清除Effect

```react
useEffect(() => {
  ....
},[count]); //仅在count发生变化时更新
```

#### 仅一次的Effect

> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），**可以传递一个空数组（`[]`）**作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

#### 可以同时存在多个useEffect

> 同时存在多个useEffect主要是可以进行分离不同的逻辑，不同的Effect不会互相影响

```react
import {useState,useEffect} from 'react'
function About(props) {

    useEffect(() => {
      ...
    });
      
    useEffect(() => {
        ...
    });
}

export default About;
```

