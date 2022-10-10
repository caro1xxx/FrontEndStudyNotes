> npm install axios

> uitls/新建request.js
>
> uitls/新建url.js

```js
import axios from 'axios';
import qs from 'qs'
import url from './url'


// 请求拦截器
axios.interceptors.request.use(config => {
    //这里对传入的是文字还是图片二进制进行判断
  if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
      config.data = qs.stringify(config.data);
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.data.code){
    // 根据状态码做反应
    switch (response.data.code) {
      case 200:
        return response.data
      case 401:
        break;
      case 402:
        break;
      case 403:
        break;
      case 404:
        break;
    }
  }else {
    return response
  }
})


//请求商品数据
function getRequest(url,params) {
  return axios.get(url,{params})
}


export default {
  ...url,
  getRequest,
}
```

```js
let baseURL1 = 'http://localhost:3000'; //地址1
let baseURL2 = 'http://localhost:3001'; //地址2
...
export default {
  baseURL1,
  baseURL2,
...
}
```

> src/新建setupProxy.js(代理)

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		proxy('/api',{ //遇见/api1前缀的请求，就会触发该代理配置
			target:'http://localhost:8000', //请求转发给谁
			changeOrigin:true,//控制服务器收到的请求头中Host的值
			pathRewrite:{'^/api':'/api'} //重写请求路径(必须)
		}),
		// proxy('/api2',{
		// 	target:'http://localhost:5001',
		// 	changeOrigin:true,
		// 	pathRewrite:{'^/api2':''}
		// }),
	)
}
```

> 使用

```react
import React, { Component } from 'react';

import $axios from '../../utils/request'
class Index extends Component {

  componentDidMount(){
    $axios.getRequest($axios.baseURL1+'/api/v1/goods').then(
      (response) => { console.log(JSON.parse(response.shop_data)); },
      error => { console.log(error); }
    )
  }

  render() {
    return (
      <div>
        ...
      </div>
    );
  }
}

export default Index;
