#### Vue2

> 在Vue中，我们不用获取dom节点，**元素绑定ref之**后，**直接通过this.$refs即可调用**，这样可以减少获取dom节点的消耗

> ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向该子组件实例
>
> 通俗的讲，ref特性就是为元素或子组件赋予一个ID引用,通过this.$refs.refName来访问元素或子组件的实例

```vue
<p ref="p">Hello</p>
<children ref="children"></children>
```

```vue
this.$refs.p
this.$refs.children
```

#### Vue3

```vue
<template>
  <div class="about">
      //这里绑定ref名字要和setup内定义的保持一致
    <h1 ref="h1Ref">This is an about page</h1>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const h1Ref = ref(null);
    onMounted(()=>{
      console.log(h1Ref.value)
    })
    return{
      h1Ref
    }
  },
}
</script>
```

> 在dom渲染完成前ref是获取不到元素节点的

> innerText可以拿到元素节点里面的文字内容

```js
console.log(h1Ref.value.innerText)
```

