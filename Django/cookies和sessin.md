## cookies
### 会话定义
> 从浏览器访问一个网站，到关闭浏览器接收此次访问，称之为一次会话
> HTTP协议是无状态的，导致会话状态难以保持，**相当于无法记住上一次和你会话的时候发送了什么**
> Cookies和Session就是为了保持会话状态而诞生的两个存储技术

### Cookies定义
> cookies是保存在客户端浏览器上的存储空间
> Chrome浏览器通过设置cookie选项找到本地存储的所有cookies

### Cookies特点
> cookies在浏览器上是以**键:值**得形式进行
存储的，键和 值都是以**ASCll字符串**的形式存**(不能是中文字符串)**
存储的数据带有**生命周期(max_age)**，到了生命周期的时间就不再可用
cookies中的数据是**按域存储隔离**的，不同的域之间**无法访问**
cookies的内部的数据会在每次访问此网址是都会携带到服务器端，**如果cookies过大会降低响应速度**

### Cookies的使用-存储

```python
HttpResponse.set_cookie(key,value='',max_age=None,expires=None)
-key:cookie的名字
-value:cookie的值
-max_age:cookie存活时间，秒为单位
-expires:具体过期时间
-当不指定max_age和expires时，关闭浏览器时cookie失效
```

```python
实例
def set_cookies(request):
    resp = HttpResponse("set cookies is ok")
    resp.set_cookie('uesrname','lzl',1000)
    return resp
然后指定路由就可以了
```
### Cookies的使用-删除&获取

```python
删除cookies
-HttpResponse.delete_cookie(key)
-删除指定key的cookies，如果key不存在则什么也不发生
```

```python
获取cookies
通过request.COOKIES绑定的字典(dict)获取客户端的COOKIES数据
value = request.COOKIES.get('cookies名','默认值')
```
## session
### Session定义
> session是在服务器上开辟一段空间用于保留浏览器和服务器交互时的重要数据

> 实现方式

* **使用session需要在浏览器客户端启动cookie，且在cookie中存储sessionid**
* **每个客户端都可以在服务器端有一个独立的Session**
* **注意：不同的请求者之间不会共享这个数据，与请求者一一对应**

### session初始配置
setting.py配置session
> 1.向INSTALLED_APPS列表中添加：

```python
'django.contrib.sessions'
默认情况下是自带的
```
> 向MIDDLEWARE列表中添加：

```python
'django.contrib.sessions.middleware.SessionMiddleware'
默认情况下是自带的
```
### session的使用
> session对象是一个类似于字典的SeeionStore类型的对象，可以用类似于字典的方式进行操作

session能够存储如字符串，整数，字典，列表等

```python
1.保存session的值到服务器
request.session['key']=value
2.获取session的值
value=request.session.get('key',默认值)
3.删除session
del request.session['key']
```
> settings.py相关配置项

```python
1.SESSION_COOKIE_AGE
作用：指定sessionid在cookies中的保存时间（默认2周）
2.SESSION_EXPIRE_AT_BROWSER_CLOSE=True
设置只要浏览器关闭时，session就失效(默认为False)
注意：Django中的session数据存储在数据库中，所以使用session前需要确保已经执行过migrate
```
### session的问题
django_session表示 单表设计；且该表数据量持续增加，这就会导致日后响应慢的问题
**解决**：可以每晚执行py manage.py clearsession(该命令可以删除已过期的session数据)