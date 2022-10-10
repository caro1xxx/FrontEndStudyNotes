> 简单双向绑定

```vue
<template>
    <div>
        <!-- v-model绑定数据，可以修改数据 -->
        <input type="text" v-model="msg">
        <!-- 绑定显示同步数据 -->
        <div>{{msg}}</div>
    </div>
</template>

<script>
// export default是默认写法
export default {
    data() {
        return {
            msg: ""
        }  
    },
}
</script>
```

> `<textarea>`也是可以双向绑定

```vue
<textarea v-model="content" cols="30" rows="10"></textarea>
        <div>{{content}}</div>
```

> **下拉菜单，单选框都是可以双向绑定的**

