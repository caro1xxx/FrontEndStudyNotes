> 配置生成环境打包命令

```js
package.json

"scripts": {
    "serve": "vue-cli-service serve --mode development",
    "build": "vue-cli-service build --mode production"
  },
```

> vue.config.js

```js
// 注意请求接口的时候不要加 baseURL 不然配置会失效
module.exports = {
  //指定
  mode: 'production'
  devServer: {
      ...
  },
  // 生成环境关闭sourceMap
  productionSourceMap: false
}
```









