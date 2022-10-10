> Seq懒运行,用的时候才会运算
>
> **非常大的性能提升**,因为是懒操作,所以如果是现去现用,那么有可能导致一瞬间的加载
>
> Seq不是一种数据结构
>
> **Map,List,Set,Seq都属于collections,Seq就是collections中的一种懒操作,Map,List等都可以转为Seq,就成为了懒的Map或者其他**,相当于一个**包装器**

```js
const {Seq} = require('immutable')

const seq = Seq([1,2,3,4,5])
	.map(x => x*x)

//定义:懒操作
//在console.log之前seq变脸是没有被运算的,
//直到console.log去观察这个seq变量时,seq才开始运算了
//相当于薛定谔的猫理论,在我们没有使用到seq变量之前,这个Seq([1,2,3,4])其实都不会存在于内存之中
console.log(seq)
```

#### 转型

```js
const list = List([1,2,3]);
const seq = Seq(list)
//现在list就被转为了懒的list了,即seq

//转懒map,懒set是一样的
```

#### Keyed

```js
const obj = {x:1,y:2}
const seq = Seq.Keyed(obj)
```

#### Indexed

```js
const arr = [1,2,3,4]
const seq = Seq.Indexed(arr)
```

#### Set

```js
const set = Set([1,2,3])
const seq = Seq.Set(set)
```

