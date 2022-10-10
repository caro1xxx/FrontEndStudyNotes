> 正确使用方法

```vue
<script>
export default {
    data(){
        return{
     
        }
    },
    methods:{
        gotodownload(event){ //gotodownload是一个自定义的处理程序event是必须代的
            window.open('http://172.20.10.4:8081/#/about');
        },
    },
}


</script>
```

```vue
@click="gotodownload($event)" //绑定事件
```

