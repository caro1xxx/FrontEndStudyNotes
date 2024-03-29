#### 选择优化的数据类型

> 选择`正确的数据类型`对于`获得高性能至关重要`

尽量使用能够**正确存储和表示数据的最小数据类型**

##### 尽量避免使用NULL

包含NULL的列对于mysql来说更难优化,因为可为NULL的列使得索引,索引统计和值比较都更加复杂.

> 使用NULL的列会使用**更多存储空间**,并且mysql需要**特殊处理**

**建议将NULL指定为NOT NULL**,虽然性能提升比较小.

##### 整数

* 整数类型可选`UNSIGNED`属性,表示不允许负值,使得正数的上限提高一倍
* mysql可以为整数限制长度,但是毫无意义

  ```bash
  INT(1) 和INT(20)在mysql看来是相同的.
  ```

...

#### mysql schema设计中的陷阱

##### 太多的列

> mysql的存储引擎API通过在**服务器和存储引擎之间**以**行缓冲区格式复制行来工作**
>
> 服务器将缓冲区解码为列
>
> `将缓冲区解码为行数据的操作的代价非常高`

##### 太多的联接

> 实体属性值(entity attribute value,**EAV**)设计模式是一种**被普遍认为糟糕的设计模式**

EAV模式设计的数据库需要**许多自联接**



