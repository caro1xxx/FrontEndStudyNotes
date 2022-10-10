> 对应Object
>
> 属于工厂函数,不能new

#### 创建

```js
const m = Map({
  x:1,
  y:2
})
```

#### set

> map的key和value可以是任意类型
>
> **set进去的键值是无序的**

```js
const m = m1.set(List([1]), {name:'jack'})
```

#### get

```js
const m = m1.get(x)
```

#### 静态方法

> isMap()

```js
const m = Map({x:1})
const x = Map.isMap(m)
//true
```

#### 成员

```js
const msize= m.size()
//1
```

#### delete

```js
const m = Map({x:1,y:2})
const dele = m.delete(x)

//{y:2}
```

#### deleteAll(removeAll)

```js
const m = Map({x:1,y:2})
const deleall = m.deleteAll([x,y])
//{}
```

#### clear

```js
const m = Map({x:1,y:2})
const clr = m.clear()
//{}
```

....

其他方法使用基本和List一致