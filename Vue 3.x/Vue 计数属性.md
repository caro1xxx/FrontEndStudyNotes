> 反转字符串

```vue
<template>
    <div>
        <!-- 反转字符串 -->
        {{msg.split('').reverse().join('')}}
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return{
            msg:'OOPS!'
        }
    },
}
</script>
```

> 使用computed关键字

```vue
<template>
    <div>
        <!-- 反转字符串 -->
        {{reversedMsg}}
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return{
            msg:'OOPS!'
        }
    },
    computed:{
        // 计算属性的 getter
        reversedMsg:function(){
            // `this` 指向 vm 实例
            return this.msg.split('').reverse().join('')
        }
    }
}
</script>
```

提供的函数将用作属性` vm.reversedMsg` 的 getter 

`vm.reversedMsg` 依赖于 `vm.msg`，在 `vm.msg`发生改变时，`vm.reversedMsg`也会更新

> **使用methods也可以达到计算属性的效果，但是一旦DOM操作页面刷新了，计算属性是直接调用前一次的计算结果使用，而函数时再一次调用函数，计算属性时依赖内存缓存的，这样的话计算属性是比函数的性能高的**

