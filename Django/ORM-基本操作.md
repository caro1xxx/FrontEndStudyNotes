## ORM-基本操作-创建数据

> 基本操作包括增删改查操作，即**CRUD操作**
>
> CRUD指的就是增加（Create），读取查询（Read），更新（Update），删除（Delete）

```python
ORM CRUD核心->模型类.管理器对象(object)
```

> 每个继承自models.Model的模型类，都有一个object对象被同样继承下来，这个对象就叫**管理器对象**

数据库的增删改查可以通过模型的管理器实现

```python
class Mymodel(models.Model):
    ...
    Mymodel.object.create(...)   #object是管理器对象
```

### 创建数据

> 方案1

创建数据中每一条记录就是器创建一个数据对象

```python
Mymodel.objects.create(属性1=值1,属性2=值2,...)
```

> 方案2

创建Mymodel实例对象，并调用save()进行保存

```python
obj = Mymodel(属性=值,属性=值)
obj.属性=值
obj.save()
```

---

## Django shell

> 在Django提供了一个交互式的操作项目叫Django shell利用Django shell 可以代替编写view的代码来进行直接操作

> 注意：项目代码发生变化时，重新进入Django shell

```python
#在项目根目录下
py manage.py shell
from 应用名.models import 模型类名
然后操作即可创建数据
```

```python
#实例
book.objects.create(title="Django",price=80.00)#创建一条数据使用django shell
```

---

## 查询操作

```python
all()方法
用法：MyModel.objects.all()
作用：查询Mymodel实体中所有的数据
等用于select * from table
返回值：Queryset容器对象，内部存放MyModel实例
返回的Queryset容器对象，是查询到的所有数据，就需要迭代输出
books = book.objects.all()
for book in books:
    print(book.title, book.price)
```

```python
vakues('列1', '列2',...)
用法：MyModel.objects.values(...)
作用：查询部分列的数据并返回
等用于select 列1,列2 from xxx
返回值：Queryset  
    返回查询结果容器，容器内 存字典，每个字典代表一条数据
格式为：{'列1':值1,'列2':值2}
```

```python
order.by()排序
用法:MyModel.objects.order_by('-列','列')
说明：默认是按照升序排序，如果需要降序排序则需要在列前面增加"-"表示
```

> **注意：只要返回值是Queryset，后面就可以连锁使用这些方法**

---

## 更新数据

> **修改数据可以使用 save() 或 update():**

```python
# 修改其中一个id=1的name字段，再save，相当于SQL中的UPDATE
test1 = Test.objects.get(id=1)
test1.name = 'Google'
test1.save()

# 另外一种方式
#Test.objects.filter(id=1).update(name='Google')

# 修改所有的列
# Test.objects.all().update(name='Google')
```

---

### 删除数据

> 删除数据库中的对象只需调用该对象的delete()方法即可

```python
# 删除id=1的数据
test1 = Test.objects.get(id=1)
test1.delete()
    
# 另外一种方式
# Test.objects.filter(id=1).delete()
    
# 删除所有数据
# Test.objects.all().delete()
```

