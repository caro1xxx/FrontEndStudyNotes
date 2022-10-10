> 先要安装nginx

> 找到nginx目录

![image-20210822115701868](通过nginx部署项目.assets/image-20210822115701868.png)

> 在nginx/html上传文件

![image-20210822120022629](通过nginx部署项目.assets/image-20210822120022629.png)

> cd到nginx的conf目录下执行

![image-20210822120249524](通过nginx部署项目.assets/image-20210822120249524.png)

关闭nginx

> 修改conf目录下的nginx.conf文件

![image-20210822120327431](通过nginx部署项目.assets/image-20210822120327431.png)

![image-20210822120450824](通过nginx部署项目.assets/image-20210822120450824.png)

```bash
server {        
		listen       8080;#需要使用的端口号   
		server_name  project1;        
		location / {            
			root   /edu/dist; #dist路径           
		 	index  index.html index.htm;
             try_files $uri $uri/ /index.html; #解决页面刷新403问题
		  }    
}

```

退出

> 重新加载配置文件

![image-20210822120553411](通过nginx部署项目.assets/image-20210822120553411.png)

> 启动nginx

![image-20210822120619998](通过nginx部署项目.assets/image-20210822120619998.png)

