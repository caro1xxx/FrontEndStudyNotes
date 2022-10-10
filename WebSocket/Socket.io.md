### Socket.io

现成socket库

> https://socket.io/get-started/chat

###  安装

```bash
npm install socket.io-client
```

TypeScript 用户注意：这些类型现在包含在`socket.io-client`包中

### 引入

```js
import { io } from "socket.io-client";
```

```js
const socket = io();
//如果前端不是来自与服务器相同的域，则必须传递服务器的 URL
//const socket = io("https://server-domain.com");
```

