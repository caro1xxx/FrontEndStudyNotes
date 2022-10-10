> 定义：FBV指的就是我们通过在**视图函数里面定义函数**来返回页面

```python
示例：
views.py
del xxx(request):
    return xxxxx
```

> CBV指的就是在**视图函数中定义类**来返回页面
>
> CBV必须继承一个**View**类
>
> **CBV是基于反射显示根据请求方式不同，执行不同的方法**

> 原理：**url->view方法->dispatch方法(反射执行其他:GET/POST/DELETE/PUT....)**
>
> **from django.views import view**

```python
示例
views.py
from django.views import view

class xxx(View):
    def get(self,request,*args,**kwargs)
        return xxxx
    def post(self,request,*args,**kwargs)
        return xxxx
    ....
定义在这个类中的两个方法被调用调用时django会自动判断是get方法还是post方法
urls.py
path('xxx',view.xxx.as_view())  #固定搭配
```

> 在CBV模式下如果需要**给类中的方法添加装饰需要**

```python
from django.utils.decorators import method_decorator

添加到dispatch的方法上面才可以使用 csrf_token
装饰类视图函数的单独某一个方法上面是无效的
@method_decorator(csrf_exempt)  #并且需要把csrf_token当做参数传给method_decorator
def dispatch(xxx)
    return xxxx 
也可以直接
@method_decorator(csrf_exempt,name='dispatch')
class xxx(View):
    ....
```

