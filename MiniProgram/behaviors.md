> `behaviors` 是用于组件间代码共享的特性,类似于Vue的mixins

1. 每个 `behavior` 可以包含一组属性、数据、生命周期函数和方法
2. **组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用**
3. 每个组件可以引用多个 `behavior` ，`behavior` 也可以引用其它 `behavior`

#### Behavior(Object objec)

> 注册一个 `behavior`，接受一个 `Object` 类型的参数

##### 参数

| 定义段     | 类型         | 是否必填 | 描述                  | 最低版本 |
| :--------- | :----------- | :------- | :-------------------- | :------- |
| properties | Object Map   | 否       | 同组件的属性          |          |
| data       | Object       | 否       | 同组件的数据          |          |
| methods    | Object       | 否       | 同自定义组件的方法    |          |
| behaviors  | String Array | 否       | 引入其它的 `behavior` |          |
| created    | Function     | 否       | 生命周期函数          |          |
| attached   | Function     | 否       | 生命周期函数          |          |
| ready      | Function     | 否       | 生命周期函数          |          |
| moved      | Function     | 否       | 生命周期函数          |          |
| detached   | Function     | 否       | 生命周期函数          |          |

```js
//例子
module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    myBehaviorData: {}
  },
  attached: function(){},
  methods: {
    myBehaviorMethod: function(){}
  }
})
```

#### 组件中使用

```js
var myBehavior = require('my-behavior')
Component({
  behaviors: [myBehavior],
  ...
})
```

#### 内置behavior

> 自定义组件可以通过引用内置的 `behavior` 来获得内置组件的一些行为

```js
Component({
  behaviors: ['wx://form-field']
})
```

> `wx://form-field` 代表一个内置 `behavior` ，它使得这个自定义组件有类似于表单控件的行为。
>
> 内置 `behavior` 往往会为组件添加一些属性。在没有特殊说明时，组件可以覆盖这些属性来改变它的 `type` 或添加 `observer`

> 更多内置behavior见官网