## csv文件定义

> 逗号分隔值（Comma-Separated Values，CSV，有时也称为字符分隔值，因为分隔字符也不可以不是逗号），其文件以纯文本方式存储表格数据（数字和文本）

> 说明：可被常见制表工具，如excel等直接进行读取

### Python中生成CSV文件

> Python提供内建库-csv；可直接通过该库操作csv文件

```python
import csv

with open('test.csv','w',newline='') as file;#这里的newline必须加，并且等于空字符串
    writer = csv.writer(csvfile)
    writer.writerow(['a','b','c'])
```

### CSV文件下载

在网站中，实现下载CSV，注意：

```python
-响应Content-Type类型需要修改为text/csv，这是告诉浏览器该文档是CSV文件，而不是html文件
-响应会获得一个额外的Content-Disposition标头，其中包含CSV文件的名称，它将被浏览器用于卡其“另存为...”对话框
```

```python
实例：
import csv
from django.http import HttpResponse

def make_csv_view(request):
    response = HttpResponse(content_type='text/csv')
    response['Content=Disposition'] = 'attachmentfilename="文件名"'
    writer = csv.witer(response)
    writer.writerow(['a','b'])
    return response
```

