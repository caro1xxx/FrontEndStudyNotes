> 解释

```vue
<script>
export default {
    data(){
        return{
            // 这里必须和后端传入的数据格式一模一样
            data:{
            "id":null,
            "s_age":null,
            "s_name":null,
            "s_number":null
            } 
        }
    },
    mounted(){
    var __this = this; //定义一个变量
    this.$axios.get('/api/students/3/') 
    .then(function (response){ //response接收数据对象
     __this.data= response.data; //把接收到的数据对象传入data中
    console.log(__this.data.s_name);
    })
    .catch(function (error){
      console.log(error);
    });
  }
}
</script>
```



