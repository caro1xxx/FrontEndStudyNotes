> next项目和普通的CSR项目不一样

首先是可以在不本地不打包,将除node_module外的源码上传到服务器

然后再服务器上下载node

在服务器中执行npm install 下载node_module包

第二步执行npm run  build

需要在服务器中构建生产环境

第三步下载pm2,这是一个类似于uwsgi的东西(pm2可以通过npm install下载)

下载好pm2之后需要配置环境path

第四步执行命令

```bash
pm2 start npm --name "你的项目名称" -- run start
```

默认启动的地址为127.0.0.1:3000

最后配置nginx进行转发

```js
server{
  //监听外网80端口
    listen 80;
    server_name xxx.com
    location / {
      //转发到pm2所启动next项目
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real_IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```



pm2命令

```js
//删除执行编号项目
pm2 delete 编号
```

```bash
pm2 stop all // 停止所有进程
```

```js
pm2 stop 0 //停止编号为0的进程
```

