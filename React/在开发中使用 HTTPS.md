#### Windows (cmd.exe

```bash
set HTTPS=true&&npm start
```

#### Windows (Powershell

```bash
($env:HTTPS = "true") -and (npm start)
```

#### Linux、macOS (Bash

```bash
HTTPS=true npm start
```

> 注意:服务器将**使用自签名证书**，因此您的网络浏览器几乎**肯定会在访问页面时显示警告**

#### 自定义 SSL

> 要设置自定义证书，请以与上述相同的方式将环境变量`SSL_CRT_FILE`和环境变量设置为证书和密钥文件的路径。请注意，您还需要设置.`SSL_KEY_FILE``HTTPS``HTTPS=true`

```bash
HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key npm start
```

> 为**避免每次都设置环境变量**，您可以`npm start`像这样包含在脚本中

```json
{
  "start": "HTTPS=true react-scripts start"
}
```

> 或者您可以`.env`使用 set 创建一个文件`HTTPS=true`