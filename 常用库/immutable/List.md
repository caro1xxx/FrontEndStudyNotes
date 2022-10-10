>  List是工厂方法,**不能使用new**

#### 创建

```js
const {List} = require('./immutable')

const list = List([1,2,3,4])
//1,2,3,4

//List.of方法可以省略数组的中括号
const list2 = List.of(1,2,3,4)
//1,2,3,4
```

#### 多维数组

> 相当于嵌套使用List工厂函数

```js
const Multidimensional = List([
  List([1,2,3,4]),
  List([11,22,33]),
  1,2,3
])

//[[List],[List],1,2,3]
```

#### 静态方法

```js
//判断一个数据是否是List
List.isList(myList)
```

#### 成员

```js
//获取list的长度
mylist.size
```

#### set

> set用于设置值,-1为设置list末尾值
>
> 如果index大于长度则会自动生成相应个数的`empty items`
>
> 因为immutable不会改变源,而是返回一个新数据

```js
const { List } = require('./immutable')

const list = List([1,2,3,4])

const x = list.set(4,5)

//1,2,3,4,5
```

#### delete

> 返回一个新对象
>
> 删除指定index位置的值
>
> 如果删除的index小于数组长度并且不是负数,那么就会出现`undefined`

```js
const d = list.delete(0)

//undefined,2,3,4
```

#### insert

> 返回一个新对象

> 在指定index位置插入值
>
> 如果index是负数,则从末尾开始

```js
const i = list.insert(3,1)

//1,2,3,1,4
```

#### clear

> 清除指定list,返回undefined

```js
const c = list.clear()

//undefined
```

#### push

> return new object
>
> 在list末尾添加指定元素

```js
const p = list.push(2)
//1,2,3,4,2
```

#### pop

> 返回新对象
>
> 每执行一次就从list末尾删除一个元素

```js
const po = list.pop()
//1,2,3
```

#### unshift

> 从首位开始添加元素

#### shift

> 从首位开始删除元素,并且被删除的元素在list中将为undefined
>
> 返回一个新对象

```js
const sh = list.shift()

//undefined,2,3,4
```

#### setSize

> 设置长度
>
> 如果设置的长度小于list长度将会截断
>
> 如果设置的长度大于list长度将会使用undefined填充

```js
const ssize = list.setSize(2)
//1,2
const ssize = list.setSize(6)
//1,2,3,4,undefined,undefined
```

#### update

> 参数1:需要更改元素的坐标
>
> 参数2:回调函数

```js
const up = list.update(1,x => x+10)
//1,12,3,4
```

#### setIn

> 对多维数组进行更改

```js
															//更改多维数组中的index为1的数组的第三个元素,改为0
const seti = Multidimensional.setIn([1,2],0)
```

#### concat(merge)

> 连接多个数组
>
> 语法:myList.concat(list1,list2,list3,...)

```js
const arr1 = List([1,2])
const arr2 = List([3,4])

const conc = arr1.concat(arr2);
//1,2,3,4
```

#### map(同原生map方法)

#### filter(同原生filter方法)

#### flatten

> 扁平化数组

> 语法:myList.flatten(可选值):
>
> ​	false:拉平非常多层级的数组
>
> ​	true:仅拉平一层
>
> ​	N(number):拉平指定层级

```js
const Multidimensional = List([
  List([1,2,3,4]),
  List([11,22,33]),
  1,2,3
])
const fla = Multidimensional.flatten(true)

//[
1,  2, 3, 4, 11,
  22, 33, 1, 2,  3
]
```

#### find

> 查找

```js
const arr3 = List(['张三','李四'])
                     //对数组中每个元素进行indexOf查找'张'
const fin = arr3.find((value,key) => value.indexOf('张') !== -1)
//张三
```

#### Keys & values & entries

> keys:返回数组中所有的key
>
> value:返回数组中所有的value
>
> entries: 返回键值对
>
> **这三个方法返回的都是iterator,所以需要使用for遍历**

```js
const keys = arr3.keys()
const value = arr3.values()
const entri = arr3.entris()
for(const k of keys){
  console.log(k)
}
for(const v of value){
  console.log(v)
}

//1,2
//张三,李四
```

#### groupBy

> 分组

```js
const people = List([
  {sex:'male',name:'jack'},
  {sex:'male',name:'jorn'},
  {sex:'female',name:'lucy'},
])

const gp = people.groupBy(x => x.sex)
```

