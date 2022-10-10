> 安装Vuex

```bash
npm install vuex@next --save
```

#### Vuex定义

> 1. State - store 内储存的状态
> 2. mutations -相当于method
>    * 可以直接操作state的数据
>    * **只能处理同步方法**
> 3. getters - 相当于computed
>    * 可以操作state的数据，**但是只是获取对state的数据进行装饰**
>    * **响应式的**，如果state内数据发生变化，getter包装的数据也会方式变化
> 4. actions - 也类似method
>    * **可以处理异步方法**
>    * **无法直接修改state内数据，必须通过mutations**
>    * 可以取得当前的state(store or module)

#### state

> 使用state

```javascript
import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0, //在state定义的数据，全局都可以访问
  },
  mutations: {},
  actions: {},
  modules: {},
});
```

```javascript
//使用这个全局都可以直接访问到state
this.$store.state.全局数据名称
```

> **不能在外界直接修改state内的数据，是不合法的**

#### mutations

> mutations可以直接操作state的数据,**只能处理同步方法**，使用mutations修改state内的数据是合法的

> 如果在setup内使用vuex那么就需要导入vuex
>
> `import { useStore } from "vuex"; //引入路由函数`
>
> `const store = useStore();`
>
> **store也不再加$**
>
> **因为在setup里没有this这个含义**

```javascript
import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
  },
  mutations: { //在mutations内定义方法修改state内数据
    add(state) {
      state.count++;
    },
  },
  actions: {},
  modules: {},
});
```

```javascript
<template>
  <div>
    {{ $store.state.count }}
    <button @click="handle">clik2</button>
  </div>
</template>
<script>
import { useStore } from "vuex"; //引入路由函数
export default {
  name: "Asycn",
  setup(props, context) {
    //使用vuex
    const store = useStore();
    //正常使用，相当于store代替了this.$store
    //定义方法
    const handle = () => {
      //调用mutations内的add方法修改state内数据
      store.commit("add"); //store也不再加$
    };
    return {
      handle, //暴露方法
    };
  },
};
</script>
```

> 如果需要传参就直接在mutations内的方法上加上参数
>
> `add(state, step)`
>
> 使用
>
> `store.commit("add", 3);`这个3 就是传过去的step

#### Acitons

> 类似method**可以处理异步方法**,**无法直接修改state内数据，必须通过mutations**

```javascript
...
  mutations: {
    add(state, step) {
      state.count += step;
    },
  },
  actions: {
      //固定参数context,第二次参数可选
    addAsycn(context, step) {
      //两秒后执行mutations内的函数并传参
      setTimeout(() => {
        context.commit("add", step);
      }, 2000);
    },
  },
...
```

```javascript
import { useStore } from "vuex";//引入路由函数
export default {
  name: "Asycn",
  setup(props, context) {
    //使用vuex
    const store = useStore();
    //正常使用，相当于store代替了this.$store
    //定义方法
    const handle = () => {
      store.dispatch("addAsycn", 5); //调用方法，没有在setup内的时候是需要$store的
    };
    return {
      handle, //暴露方法
    };
  },
};
</script>
```

#### getters

> getter用对对store中的数据进行加工处理形成新的数据，**不会修改数据，并且getter是响应式的**

```javascript
...
getters: {
    showNum: (state) => {
      return "当前最新数据" + state.count;
    },
  },
...
```

> 使用

```javascript
$store.getters.showNum //对应getters内的名称
```

#### **自定义语法糖**

> 在setup中使用vuex的mutations和aciton
>
> 可以直接return暴露出去不需要在局部进行定义方法名

```javascript
return {
      // 使用 mutation
      increment: () => store.commit('increment'),

      // 使用 action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
```

