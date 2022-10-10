> router/index.js配置

![image-20210725173637802](Vue 路由.assets/image-20210725173637802.png)

如果把`mode: 'history'`换成`mode: 'hash'`那么就会多出一个#号：

![image-20210725173817061](Vue 路由.assets/image-20210725173817061.png)

如果把`base: process.env.BASE_URL`替换为任意的字符那么在路由前面就会加上你添加的字符

![image-20210725173924448](Vue 路由.assets/image-20210725173924448.png)

