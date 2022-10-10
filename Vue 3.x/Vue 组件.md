## 组件

> 组件就是自定义标签

```vue
#views/Demo3.vue
<template>
    <div>
        <!-- 使用组件 -->
     <my-component></my-component>
    </div>
</template>

<script>
// 导入自定义组件
import MyComponent from '../components/component1.vue'
// export default是默认写法
export default {
    data() {
        return {

        }
    },
    // 组件
    components: {
        MyComponent
    },
}
</script>
```

```vue
#component/component1.vue
<template>
    <div>123131</div>
</template>


<script>
export default {
    
}
</script>

<style>

</style>
```

> 组件传递参数

```vue
<template>
    <div>
        <!-- 组件传递参数 -->
     <my-component text="abcsdsd"></my-component>
    </div>
</template>

<script>
// 导入自定义组件
import MyComponent from '../components/component1.vue'
// export default是默认写法
export default {
    data() {
        return {

        }
    },
    // 组件
    components: {
        MyComponent
    },
}
</script>
```

```vue
<template>
    <div>{{text}}</div>
</template>


<script>
export default {
    name:"MyComponent1",
    // props：接收传递的参数
    props:['text']
}
</script>

<style>

</style>
```

> 传递动态参数

```vue
<template>
    <div>
        <!-- 组件传递动态参数  使用v-bind-->
     <my-component :text="msg"></my-component>
    </div>
</template>

<script>
// 导入自定义组件
import MyComponent from '../components/component1.vue'
// export default是默认写法
export default {
    data() {
        return {
            // 定义传递数据
            msg:"动态参数"
        }
    },
    // 组件
    components: {
        MyComponent
    },
}
</script>
```

```vue
<template>
    <div>{{text}}</div>
</template>


<script>
export default {
    name:"MyComponent1",
    // props：接收传递的参数
    props:['text']
}
</script>

<style>

</style>
```

