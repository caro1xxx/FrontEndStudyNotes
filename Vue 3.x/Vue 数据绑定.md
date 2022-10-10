> 在views目录下的Test.vue组件中
>
> 数据绑定使用v-bind

```vue
<template>
    <div class="test">
        <h1>test page</h1>
        {{ msg }}
        <div>
            {{ type + ":" + msg }}
        </div>
        <!-- v-bind绑定属性 -->
        <div v-bind:title="title">这是一个div</div>
        <!-- 省略v-bind简写绑定属性 -->
        <div :title="title">这也是一个div</div>
        <!-- 绑定动态属性 -->
        <div :[attrname]="msg">链接</div>
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return{
            msg:'xxx',
            type:"news",
            title:"这是一个div",
            attrname:'title'
        }
    },
}
</script>
```

