> 在views目录下的Demo1.vue组件中
>
> 数据绑定使用v-bind

```vue
<template>
    <div>
        <!-- 绑定单个class -->
        <div :class="classA">绑定class</div>
        <!-- 通过数组绑定多个class -->
        <div :class="[classA, classB]">绑定多个class</div>
        <!-- 通过对象绑定多个class -->
        <div :class="classObj">绑定多个class</div>

        <!-- 绑定style -->
        <div :style="{color: color, fontSize: ft}">绑定style</div>
        <!-- 通过对象绑定style -->
        <div :style="styleObj">绑定style</div>
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return{
            classA:"current",
            classB:"focus",
            classObj:{
                classA: true,
                classB: true,
            },
            color:"red",
            ft:"20px",
            styleObj:{
                color:"blue",
                fontSize:"10px",
            },
        }
    },
}
</script>
```

