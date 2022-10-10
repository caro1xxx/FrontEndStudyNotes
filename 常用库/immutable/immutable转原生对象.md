> 即将immutable对象转为js原生对象

#### fromJS()

> 原生对象转immutable对象

```js
const immutable = require('immutable')

//object => immutabl map
const map = immutable.fromJS({x:1,y:2})
//array => immutable list
const list = immmutable.fromJS([1,2,3,4])

```

#### toJS

> immutable转原生对象

```js
const list = List([1,2,3,4])

const arr = list.toJS()

...
```

