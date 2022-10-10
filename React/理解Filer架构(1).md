> Stack Reconcile是一个**同步的递归过程**,导致JavaScript对主线程的超时占用,使页面长时间无法得到响应,所以才产生了"卡顿"这样的困局

> 使得React团队对核心Stack Reconcile 重写了, **"Fiber Reconcile"**

#### Stack Reconclie

> 栈调和机制下的Diff算法,其实树的**深度优先遍历**的过程,**深度优先就离不开递归**
>
> 在递归Diff时,调和器会重复"父组件调用子组件的"过程
>
> 直到最深的一层节点更完毕,才慢慢向上返回,**最致命的问题是,整个过程是同步,不能够被打断**

> 如果遇到DOM树**十分庞大**的情况下,Stack Reconcile需要的**调和时间会很长**
>
> 这就意味着JavaScript线程将**长时间**的霸占主线程,进而导致**页面卡顿,无响应**

#### Fiber

> 从架构角度来看,Fiber是对React核心算法的重写
>
> 从编码角度来看,Fiber是React内独所定义的一种数据结构
>
> 从工作流的角度来看,Fiber节点保存了组件所以**需要更新的状态和副作用.**

> Fiber架构的应用目的是显示"**增量渲染**"

##### Fiber架构核心: 可中断,可恢复,优先级

> 15.x的Stack Reconcile执行顺序
>
> Reconcile(找不同)  ---> Renderer(渲染不同)
>
> 16.x的Fiber Reconcile 执行顺序
>
> Scheduler(调度更新的有限级) ---> Reconcile(找不同)  ---> Renderer(渲染不同)

> 新老架构对声明周期的影响

![image-20211211140203032](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211140203032.png)















