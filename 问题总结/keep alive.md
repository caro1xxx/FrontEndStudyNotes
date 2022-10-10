> 注意keep alive 渲染的地方必须在`<router-view/>`的地方才会起作用

```vue
<keep-alive>
    <router-view/>
</keep-alive>
```

其他参数看官网https://v3.cn.vuejs.org/api/built-in-components.html#transition-group

#### Vue3 keep alive

```vue
<router-view v-slot="{ Component }">
    <keep-alive>
        <component :is="Component" />
    </keep-alive>
</router-view>
```

> router/index.js

```js
{
    path: "/HomePage",
        name: "HomePage",
            component: () =>
            import("../views/HomePage.vue"),

                // 新增
                meta:{
                    keepAlive: true, //此页面需要缓存
                },
},
```

> 返回采用`this.$router.back();`和`history.go(-1);`都可以， 不能采用`this.$router.push('/HomePage');`

> **注意**: 在有v-for循环组件的地方使用keep-alive会失效

