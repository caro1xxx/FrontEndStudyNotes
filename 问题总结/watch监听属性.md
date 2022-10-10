> 用法

```vue
<script>
export default {
    data(){
        return{
 			count:0,
            },
            
        }
    },
    // 监听数据是否加载完成
    watch:{
      count:function(){
        // document.getElementById('loading').style.height="0px";
        document.getElementById('loading').style.visibility='hidden'
      }
    },
    mounted(){
      var __this = this; //定义一个变量
      this.$axios.get('/api/home/')
        .then(function (response){ //response接收数据对象
        __this.data= response.data; //把接收到的数据对象传入data中
        __this.count++; //加载完数据改变count的值
        console.log(__this.count);
        console.log(__this.data);
        })
        .catch(function (error){
          console.log(error);
        });
    },
    

  }
</script>
```

