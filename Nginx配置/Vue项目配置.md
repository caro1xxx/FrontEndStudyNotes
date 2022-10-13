

```json
...
server{
  listen 80;
  server_name radio;
  location / {
    root  /www/wwwroot/www.vwcode123.com/dist;
    index index.html index.htm;
    try_files $uri $uri/ /index.html; #解决页面刷新403问题
  }
}
...
```

