> Google 商店
>
> Redux DevTools

> npm下载包
>
> `npm install redux-devtools-extension`

> 修改store

```react
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//如果createStore里面写了第二个参数,那就
export default createStore(xxReducer,composeWithDevTools(applyMiddleware(thunk)))
//如果没有第二个参数
createStore(xxReducer,composeWithDevTools())
```

