> django不支持使用uwsgi方式部署asgi的项目
>
> 需要使用adpne或者去python虚拟环境中启动

> 目前解决方法
>
> 使用python包管理器1.9 可以访问到虚拟环境(2.0不行)
>
> 项目需要是debug=True

> 访问虚拟环境

```bash
source /www/wwwroot/geko123.com/backend/car_venv/bin/activate
```

```bash
nohup python manage.py runserver 0.0.0.0:8002
```

> 以上操作就可以把python项目维持可以使用websocket