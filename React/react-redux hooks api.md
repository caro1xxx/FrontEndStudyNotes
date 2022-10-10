> 在class组件中使用react-redux的connect()
>
> 而在函数组件中使用react-redux hooks

#### Api

##### useSelector()

```js
const result : any = useSelector(selector : Function, equalityFn? : Function)
```

> 作用：从redux的store对象中提取数据(state)

> 注意：selector函数应该是个**纯函数**，因为可能在任何时候执行多次

```react
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  								//因为selector需要是个纯函数
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}
```

> selector函数被**调用时**将会被传入Redux store的**整个state**，作为**唯一的参数**。**每次函数组件渲染时，selector函数都会被调用**。useSelector()同样会订阅Redux的store，并且在分发action时，都会被执行一次

* 组件渲染,selector调用
* 分发action,selector调用
* useSelector()默认的比较模式是严格引用比较===

##### useDispatch()

```js
const dispatch = useDispatch()
```

> 作用：返回Redux store中对dispatch函数的引用

> 当使用dispatch函数将回调传递给子组件时，**建议使用useCallback函数将回调函数记忆化**，防止因为回调函数引用的变化导致**不必要的渲染**

```js
const incrementCounter = useCallback(
  () => dispatch({ type: 'increment' }),
  [dispatch]
)
```

##### useStore()

```js
const store = useStore() 
```

> 作用：返回传递给组件的 Redux store 的引用

> 注意：**应该将useSelector()作为首选**，只有在个别场景下才会需要使用它，比如替换 store 的 reducers

```react
import React from 'react'
import { useStore } from 'react-redux'

export const Counter = ({ value }) => {
  const store = useStore()

  return <div>{store.getState()}</div>
}
```

#### 自定义 context

> <Provider> 允许通过 context 参数指定一个**可选的 context**。在构建复杂可复用的组件时，**若不想让私人 store 与使用这个组件的用户的 Redux store 发生冲突**(将组件的store和用户的store分离)，可以使用这种方法

```react
import React from 'react'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux'

const MyContext = React.createContext(null)

export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
```

> 使用 creator 函数来创建自定义 hook，从而访问可选的 context