> 在views目录下的Demo2.vue组件中
>
> 条件判断使用v-if 、v-else、v-else-if

```vue
<template>
    <div>
        <!-- 使用v-if条件判断 -->
        <p v-if="seen">现在你看到我了</p>
        <!-- 多个元素包裹在 <template> 元素上进行判断 -->
        <template v-if="seen2">
            <h1>网站</h1>
            <p>Google</p>
            <p>Runoob</p>
            <p>Taobao</p>
        </template>
        <!-- v-else -->
        <div v-if="num > 0">
            大于0
        </div>
        <div v-else>
            小于0
        </div>
        <!-- v-else-if -->
        <div v-if="type === 'A'">
            A
        </div>
        <div v-else-if="type === 'B'">
            B
        </div>
        <div v-else-if="type === 'C'">
            C
        </div>
        <!-- v-show -->
        <h1 v-show="ok">show</h1>
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return{
            seen: true, /* 改为false，信息就无法显示 */
            seen2:true,
            num:2,
            type:'A',
            ok:true,
        }
    },
}
</script>
```

> **v-else 、v-else-if 必须跟在 v-if 或者 v-else-if之后。**

