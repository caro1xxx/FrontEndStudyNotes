#### Props

```vue
//父组件
<template>
  <div>
    <Child1 :msg1="msg1"></Child1>
  </div>
</template>
<script setup>
import Child1 from "@/components/Child1.vue";
import { ref } from "vue";
const msg1 = ref("这是传给子组件的信息2");
</script>

<style lang="scss" scoped></style>

```

```vue
//子组件
<template>
  <div>
    {{ props }}
  </div>
</template>

<script setup>
// 不需要引入 直接使用
// import { defineProps } from "vue"
const props = defineProps({
  msg1: String,
  //或者给初始值
    //msg1: {
    	//type:String,
        //default:""
		//}
});
</script>
```

### $emit

> emit事件派发

```vue
//父组件
<template>
  <div>
      //这里绑定的myckick和子组件的myclick对应，调用父组件的onMyClick事件
    <Child1 @myClick="onMyClick"></Child1>
  </div>
</template>
<script setup>
  import Child1 from "@/components/Child1.vue"
  const onMyClick = (msg) => {
      console.log(msg)
  }
</script>
<style lang="scss" scoped></style>
```

```vue
//子组件
<template>
  <div>
    <button @click="handleClick">click</button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue"
// 方法一 适用于Vue3.2版本 不需要引入
// import { defineEmits } from "vue"
const emit = defineEmits(["myClick"])
const handleClick = () => {
  emit("myClick", "这是发送给父组件的信息");
};
</script>
```

### expose / ref

> 父组件获取子组件的属性或者调用子组件方法

```vue
//父组件
<template>
  <div>
    <!-- 注意 ref="comp" -->
    <Child1 ref="comp"></Child1>
    <button @click="handlerClick">click</button>
  </div>
</template>
<script setup>
import Child1 from "@/components/Child1.vue";
import { ref } from "@vue/reactivity";
// 注意 ref="comp"
const comp = ref(null);
const handlerClick = ()=>{
  console.log(comp.value.ChildName);// 获取子组件对外暴露的属性
  comp.value.someMethod();// 调用子组件对外暴露的方法
}
</script>
```

```vue
//子组件
<template>
    <div>
    </div>
</template>
<script setup>
// 方法二 适用于Vue3.2版本, 不需要引入
// import { defineExpose } from "vue"
defineExpose({
    // 子组件属性
    ChildName:"这是子组件的属性",
    // 子组件方法
    someMethod(){
        console.log("这是子组件的方法")
    }
})
</script>

<style lang="scss" scoped>

</style>
```

