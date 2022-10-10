> 查询nobup开启程序的端口 如8002端口

![image-20210813213903905](退出nobup.assets/image-20210813213903905.png)

```bash
lsof -i:8002
```

> 查询到之后kill进程

```bash
kill PID(27684)
```

