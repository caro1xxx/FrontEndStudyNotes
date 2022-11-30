> django不支持使用uwsgi方式部署asgi的项目
>
> 需要使用adpne或者去python虚拟环境中启动

> 目前解决方法
>
> 使用python包管理器1.9 可以访问到虚拟环境(2.0不行)
>

##### 宝塔新建python项目

项目名随意

项目路径  指的项目根目录

项目框架 django

项目启动方式 uwsgi

项目启动目录 项目根目录/包含setting.py的那个目录

##### 进入虚拟环境

```bash
source /www/wwwroot/项目/后端项目/项目_venv/bin/activate
```

最开始进入虚拟环境的时候会自动跳转到系统根目录

(socket_venv) [root@VM-4-8-centos *~*]#

只需要不断cd到项目目录下执行

```bash
nohup python manage.py runserver 127.0.0.1:8998
```

##### nginx转发ws请求

```js
server {
      listen 8989;
      server_name socket;#项目名
      location / {
        root  /www/wwwroot/socket/dist;#前端文件目录
        index index.html index.htm;
        try_files $uri $uri/ /index.html; #解决页面刷新403问题 路由等问题
      }
      # 转发后端ws
      location /ws {
        proxy_pass http://127.0.0.1:8998;
        proxy_http_version 1.1;
        #将http升级为ws
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
      }
    }
```



