> pip3 install mysqlclient 报错

> 首先查找mysql_config文件夹位置，一般在/usr/local/mysql/bin/这个路径下
>
> 然后将mysql_config链接到/usr/local/bin目录下
>
> ```bash
> $ ln -s /usr/local/mysql/bin/mysql_config /usr/local/bin/mysql_config
> ```
>
> 最后再执行 pip3 install mysqlclient 就可以成功