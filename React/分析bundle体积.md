> [源地图资源](https://www.npmjs.com/package/source-map-explorer)(map source)管理器使用源地图分析 JavaScript 包。这有助于您了解代码膨胀的来源

```bash
npm install --save source-map-explorer
```

> 然后在 中`package.json`，将以下行添加到`scripts`

```json
   "scripts": {
+    "analyze": "source-map-explorer 'build/static/js/*.js'",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
```

```bash
//打包生产
npm run build
//分析打包
npm run analyze
```

