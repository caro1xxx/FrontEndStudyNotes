> _mysql&#039; is not defined

> django下调用MySQLdb，MySQLdb与python3.x冲突





> Pip3 install pymysql

> settings.py目录下的**init**.py文件下加入以下代码：
>
> ```
> #使用pymysql替代MySQLdb
> import pymysql
> pymysql.install_as_MySQLdb()
> ```

> python manage.py makemigrations