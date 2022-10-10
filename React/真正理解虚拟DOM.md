#### React选择虚拟DOM,真的是为了性能吗?

##### 为什么我们需要虚拟DOM?

> **DOM操作是很慢的,而js却可以很快,直接操作DOM可能会导致频繁的回流与重回,js不存在这些问题,因此虚拟DOM比原生DOM更快**

##### 虚拟DOM

> 本质上是JS和DOM之间的一个**映射缓存**,在**形态上表现**为,一个能够描述DOM**结构及其属性信息的JS对象**

![image-20211210213331253](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211210213331253.png)

#### 虚拟DOM是如何解决问题的

![image-20211210214829506](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211210214829506.png)

![image-20211210214848380](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211210214848380.png)

#### 总结

>所以React选择虚拟DOM**不仅仅是因为性能**,而是因为虚拟DOM能让开发者写得爽,在于**研发体验/研发效率**的同时性能也比较好

> **虚拟DOM的价值不在性能,而在别处**

#### 虚拟DOM的价值到底是什么?

> 解决的问题

> 1. 研发体验/研发效率的问题
> 2. 跨平台的问题



































































