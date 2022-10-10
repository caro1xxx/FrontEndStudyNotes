> RESTful 规范 ：Web数据请求接口规范 (这只是一个规范建议，并不是协议，不是强行遵守)

1. 非分离开发方式(前后端放在一起写)
2. 前后端分离

指的就是前端(html.css....)

后端就负责提供数据，不再操作前端，那我们就是给前端提供数据的支撑相当于后端只使用HttpResonse返回数据，不再渲染和重定向，直接给前端一个url，前端使用这个url得到数据，这个url就是api

```python
RESTful 十条规范
1.通常使用https请求
2.域名：有api关键字出现
    -https://api.exanple.com  (存在跨域问题)
    -https://www.example.com/api  (通常使用这种)
3.版本：不同版本标注
    -https://www.example.com/api/v1
   -https://www.example.com/api/v2
4.资源：请求的目标数据称之为资源，资源一般为单词复数表示
    -https://www.example.com/api/v1/books
5.操作方式：不从请求链接体现操作方式，从请求方式上决定操作方式
    -get：https://example.com/api/v1/books  获取所有
    -post：https://example.com/api/v1/books  新增一本
    -put：https://example.com/api/v1/book/1  更新id=1的一本
    -patch：https://example.com/api/v1/book/1  更新id=1的一本
    -delete：https://example.com/api/v1/book/1  删除id=1的一本
6.资源过滤：通过接口传递参数来过滤资源
    -https://www.example.com/api/v1/books?limit=10 限制10条数据
7.状态码：返回数据要标注状态码，通过在数据中{'status':200}
    -SUCCESS(0, "查询成功")
    -NODATA(1, "非正确，无数据，显示基本信息")
    -FEAILED(2, "查询失败")
8.错误信息：请求失败标注错误信息 {'message':'请求不合法'}
9.操作结果：请求操作成功的结果{'results':' '}
    -get：返回资源列表 | 返回单一资源
    -post：返回单一新增资源
    -put：返回更新的资源
    -patch：返回更新的资源
    -delete：返回空文档
10.子资源返回资源接口：返回的资源如果有子资源，返回子资源的链接地址，如查找书，书的封面图片就可以url表示
```

```python
以前的接口开发模板样式
urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_order', views.get_order),
    path('post_order/', views.post_order),
    path('delete_order/', views.delete_order),
    path('update_order/', views.update_order),
]

from django.http import HttpResponse


def get_order(request):
    pass


def post_order(request):
    pass


def delete_order(request):
    pass


def update_order(request):
    pass
```

> 这样做就导致如果有很多张数据库需要操作就会有很多的api，从而有了RESTful规范

```python
RESTful规范的api
就给一个url
path('order',views.order)

基于FBV
def order(request):
    if request.method == 'GET':
        return HttpResponse('获取')
    if request.method == 'POST':
        return HttpResponse('提交')
    if request.method == 'PUT':
        return HttpResponse('更新')
    if request.method == 'DELETE':
        return HttpResponse('删除')
还可以基于CBV，基于CBV的话更加简单
```

> **这样就是通过method来判断从order来的请求方式是什么，从而返回相应操作**

