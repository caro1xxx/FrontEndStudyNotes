在初始安装mysql时会自带一个数据库`performance schema.`

performance schema提供了有关mysql服务器的**底层指标**

#### performance schema工作机制

* 程序插桩(instrument):在mysql代码中观**插入探测代码**,以获得我们想要了解信息
* 消费者表(consumer):指关于**程序插桩代码信息的表**,收集插桩所执行的次数,花费时间等

插桩和前端埋点一样,**启用插桩会增加消耗cpu资源**

#### 插桩元件

在`setup_instruments`表中包含所有支持的插桩列表

插桩名称由**斜杠分隔**的部件组成:

```bash
* statement/sql/select
* wait/aynch/mutex/innodb/autoinc_mutex
```

statement 和wait代表了插桩的类型,**后续斜线代表父子关系**,如select是sql的子系统的一部分

#### sys Schema

5.7开始performance_schema数据配套使用的`sys schema`完全基于performance_schema上的视图和存储例程组成.

**它存在的目的是为了让performance_schema更加流畅**

#### 线程

>  mysql服务端是**多线程**软件.

**每个**线程**至少有两个唯一标识符**

1. 操作系统线程ID
2. mysql内部线程ID

内部线程ID通过在performance_schema表中以**THREAD_ID命名**

每个前台线程都有一个指定的**PROCESSLIST_ID**(连接标识符)

`THREAD_ID !== PROCESSLIST_ID`

`threads`表中记录了服务器所有线程.

performance schema到处使用THREAD_ID

**PROCESSLIST_ID仅在threads表中可用**

> 如果需要**杀死持有死锁**的链接,可以在threads表中查询PROCESSLIST_ID

#### 配置Performance Schema

##### 启用或禁用Performance Schema

启用或禁用performance_schema可以设置为on/off

`performance_schema`为**只读变量**,只能通过两种方式改变

1. 配置文件
2. 启动mysql服务时制定指定参数

##### 启用或禁用插桩

`setup_instrument`可以**查看插桩状态**

三种方式启用/禁用插桩

1. setup_instrument表(相当于修改字段value)
2. 调用sys schema的`ps_setup_enable_instrument`存储过程
3. 使用`performance-schema-instrument`启动参数

> 以上三种方式,**1和2方法**都会在**数据库重启之后配置失效**

##### 启用或禁用消费者表

三种方式启用/禁用

1. 使用Performance Schema中`setup_consumers`表
2. 调用sys schema中的`ps_setup_enable_consumer`或`ps_disable_consuper`存储过程
3. 使用`performance-schema-consumer`启动参数

