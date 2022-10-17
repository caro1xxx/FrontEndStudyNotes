> next项目和普通的CSR项目不一样

首先是可以在不本地不打包,将除node_module外的源码上传到服务器

然后再服务器上下载node

在服务器中执行npm install 下载node_module包

第二步执行npm run  build

需要在服务器中构建生产环境

第三步下载pm2,这是一个类似于uwsgi的东西(pm2可以通过npm install下载)

第四步执行命令

```bash
pm2 start npm --name "你的项目名称" -- run start
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

