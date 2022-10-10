> 使用命令安装：npm install vue-cookies --save

> main.js里面引用

```vue
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
```

> 页面js使用

```vue
this.$cookies.set('key',value);//增加cookie，返回 this
 
this.$cookies.get('key');//获取cookie，返回 value
 
this.$cookies.remove('key');//删除cookie，返回 false 或 true
 
this.$cookies.isKey('key');//查询cookie是否存在该key，返回 false 或 true
 
this.$cookies.keys();//查询已存在的所有cookie，返回数组

this.$cookies.set('key',value,60); //设置cookie过期时间为60秒
```

