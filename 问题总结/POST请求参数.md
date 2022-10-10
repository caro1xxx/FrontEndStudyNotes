> 直接传递对象给后端

```vue
methods:{
        login:function(){
            var __this = this;
            let data = {"username":this.username,"password":this.password};
            this.$axios.post("/api/v1/auth/",data)
            .then(res=>{
                console.log('res=>',res); 
            })
        }
    },
```

