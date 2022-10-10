> 不要缓存'./html/index.html',(首页html路径)
>
> 而是换成'/',会自动访问首页
>
> 不然访问失败

> 原因:因为我们在浏览器访问的是localhost,然后缓存了首页的html路径('./xxx/index.html'),这是就导致访问localhost找不到index.htm文件