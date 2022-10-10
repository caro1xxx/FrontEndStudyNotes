> 封装axios为了让代码冗余减少，而且使用更加简单

在src下新建文件夹http 文件夹下新建文件api.js

![image-20210819224952275](Vue 封装axios.assets/image-20210819224952275.png)

> 使用封装的axios

```javascript
import { get } from "../http/api" //导入
```

![image-20210819225253737](Vue 封装axios.assets/image-20210819225253737.png)

#### 添加baseURL

> 添加baseURL就可以集体控制所有使用了封装axios访问url

![image-20210819225611141](Vue 封装axios.assets/image-20210819225611141.png)

> 使用

![image-20210819225642003](Vue 封装axios.assets/image-20210819225642003.png)

#### baseURL判断生产环境

```vue
baseURL:process.env.NOOE.ENV === 'development'?'域名':'/'
```

> 这样可以自动判断使用开发环境的url还是生产环境的

#### 拦截器

> 指的是所有请求或者响应都先走拦截器内的内容，然后再执行请求或响应

##### 请求拦截

> 所有请求都想走请求的拦截

![image-20210819230709435](Vue 封装axios.assets/image-20210819230709435.png)

![image-20210819230716663](Vue 封装axios.assets/image-20210819230716663.png)

##### 响应拦截

> 所有响应都想走响应的拦截

![image-20210819231058829](Vue 封装axios.assets/image-20210819231058829.png)

![image-20210819231105220](Vue 封装axios.assets/image-20210819231105220.png)

#### 发送代token的请求

> 有时候请求数据需要向后端发送请求头携带token或者其他的场景，请求拦截就可以完成

![image-20210819231554187](Vue 封装axios.assets/image-20210819231554187.png)

![image-20210819231606507](Vue 封装axios.assets/image-20210819231606507.png)

#### 封装代理

> 解决cors问题

![image-20210820101108887](Vue 封装axios.assets/image-20210820101108887.png)

api.js

![image-20210820101202005](Vue 封装axios.assets/image-20210820101202005.png)

![image-20210820101258678](Vue 封装axios.assets/image-20210820101258678.png)

> 使用

![image-20210820101404419](Vue 封装axios.assets/image-20210820101404419.png)

