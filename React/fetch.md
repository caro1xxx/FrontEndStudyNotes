> **fetch是内置的,window上本身就自带**
>
> **而jQuery和axios是对xhr的封装,都需要下载引入**
>
> **fetch和xhr是两个东西,**没了axios和jQuery一直能用fetch发请求

> **fetch也是promise风格**

```react
fetch('localhost').then(
	response => {
		console.log('联系服务器成功了');
         return response.json() //这个json()是response身上的json 
    },
    error => {
    	console.log('联系服务器失败',error)
        //这里的then是上一个then返回的promise实例,对上一个then返回的实例进行判断
    }.then(
		response => {
    		console.log('获取数据成功',response)
    	},
        error => {
            console.log('数据获取失败',error)
        }
	)
)
```

> 具体思路, fetch发送请求,先看是否连上服务器,如果连上服务器那么就判断数据判断数据获取成功 -> **这就是关注分离**

## 集中处理错误

```react
fetch("localhost")
      .then((response) => {
        console.log("联系服务器成功了");
        return response.json();
      })
      .then((response) => {console.log("获取数据成功", response);})
		//catch集中处理错误
      .catch((error) => {console.log("请求出错", error);})
```

## 异步

> await asycn

```react
send = async () => {
    try {
      const response = await fetch("localhost");
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
```

