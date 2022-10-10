> 在vuex的index.js中

```vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	//state里面定义的是公用的数据
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

```
//在其他组件中调用mutations里面定义的函数对state里面的数据进行更改
mutations: {
	函数名(state, 参数)
	对state里面的数据进行操作
  },


methods:{
	this.$store.commit('函数名',参数)
}
```

