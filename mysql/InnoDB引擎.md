InnoDB是mysql默认事务型存储引擎

* InnoDB使用MVCC来实现高并发,并实现了4个SQL标准隔离级别.

* InnoDB默认为REPEATABLE READ隔离级别,并通过**间歇锁(next-key lock)策略**来防止该级别上的**幻读**

* InnoDB还对索引结构中的**间隙进行锁定**,以防止**幻行被插入**

* InnoDB基于**聚簇索引**构建的

