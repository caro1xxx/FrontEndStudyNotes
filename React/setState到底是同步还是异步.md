> 在我们客观印象中每次setState就**等价于一次**render,但是**频繁的render就会导致性能下降**,react官网也想到了这一点

> 所以**不是每次setState都会触发一次render**,而是每次setState都会往一个**容器内存state**,当**达到某一时间**,容器内的state进行合**并触发一次更新**,

#### 异步的动机和原理:批量更新

> 尽管我们一次性setState100次,state也**不会立刻发生改变**,只是state的**任务队列内容发生了变化,**

#### "同步现象"

> **只要是在React管控下的setState,一定是异步的**
>
> setTimeout帮助setState 逃脱了 React的管控,导致同步

##### 解读setState工作流

15.x

![image-20211211132140281](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211132140281.png)

#### 总结

> setState的表现会因调用场景的不同而不同:
>
> * 在React钩子函数及合成时间中,它表现为**异步**
> * 在setTimeout,setInterval等函数中,包括在DOM原生事件中,它都表现为**同步**

> 在16以来,整个React核心算法被重写,setState也被**"fiber化"**





































