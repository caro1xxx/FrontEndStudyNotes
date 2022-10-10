#### 基础性能调试

> 项目目录下的reportWebVitals.js即是该文件

> 要测量任何受支持的指标，您只需将一个**函数传递给`reportWebVitals` 函数**

```js
reportWebVitals(console.log);
```

#### 跟踪用户并将性能结果发送给您

> 使用该`reportWebVitals`功能，您可以将**任何结果发送到分析端点**，以**测量和跟踪**您网站上的**真实用户表现**。

```js
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';

  // 相当于埋点,所以一般使用`navigator.sendBeacon()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

reportWebVitals(sendToAnalytics);
```

