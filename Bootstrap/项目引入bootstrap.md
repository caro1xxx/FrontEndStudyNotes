#### install

```bash
npm install jquery --save-dev
npm install bootstrap -D
npm install popper.js -D
```

#### vue.config.js

```js
const webpack = require("webpack");
module.exports = {
  // // 配置插件参数
  configureWebpack: {
    plugins: [
      // 配置 jQuery 插件的参数
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"],
      }),
    ],
  },
};
```

#### main.js

```js
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
```

#### 报错

> 如果报错提示缺少popper.js/core 就执行 npm install @popperjs/core 然后npm audit fix 就可以解决问题

