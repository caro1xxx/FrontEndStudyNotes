#### 基础配置

```js
npm init
//初始化
```

```bash
npm install webpack webpack-cli webpack-dev-server -D
//webpack 依赖
```

```bash
新建config文件夹
config/
	webpack.config.base.js //公共环境
	webpack.config.dev.js	//开发环境
	webpack.config.prod.js //生产环境
```

```js
//base
const path = require("path");

/**
 * @method resolve
 * @description 从根路径开始查找文件
 */
const resolve = (targetPath) => {
  return path.resolve(__dirname, "..", targetPath);
}

module.exports = {
  target: "web",
  // 入口文件
  entry: {
    main: resolve("./src/index.js"),
  },
  // 输出
  output: {
    // 文件名称
    filename: "[name].[contenthash].js",
    // 输出目录
    path: resolve("./dist"),
    // 每次编译输出的时候，清空dist目录 - 这里就不需要clean-webpack-plugin了
    clean: true,
    // 所有URL访问的前缀路径
    publicPath: "/",
  },
  resolve: {
    // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"],
    // 设置链接
    alias: {
      // 注意resolve方法开始的查找的路径是/
      "@": resolve("./src"),
    },
  },
};

```

```js
//dev
// merge，合并两个或多个webpack配置文件
const { merge } = require("webpack-merge");

// 导入公共配置文件
const webpackConfigBase = require("./webpack.config.base");

// dev环境下相关配置
module.exports = merge(webpackConfigBase, {
  // 指定环境
  mode: "development",
  // 输出source-map的方式，增加调试。eval是默认推荐的选择，build fast and rebuild fast！
  devtool: "eval",
  // 本地服务器配置
  devServer: {
    // 启动GZIP压缩
    compress: true,
    // 设置端口号
    port: 3000,
    // 代理请求设置
    proxy: {
      "/api": {
        // 目标域名
        target: "http://xxxx.com:8080",
        // 允许跨域了
        changeOrigin: true,
        // 重写路径 - 根据自己的实际需要处理，不需要直接忽略该项设置即可
        pathRewrite: {
          // 该处理是代码中使用/api开头的请求，如/api/userinfo，实际转发对应服务器的路径是/userinfo
          "^/api": "",
        },
        // https服务的地址，忽略证书相关
        secure: false,
      },
    },
  },
});

```

```js
//prod
const { merge } = require("webpack-merge");
const webpackConfigBase = require("./webpack.config.base");

module.exports = merge(webpackConfigBase, {
  // 指定打包环境
  mode: "production",
});

```

> 添加package.json命令行

```json
"scripts": {
  //快捷命令
  "dev": "webpack serve --config config/webpack.config.dev",
  "build": "webpack build --config config/webpack.config.prod"
},
```

#### 解析HTML

```bash
npm install html-webpack-plugin -D
```

> 创建public文件夹/index.html

```js
//base.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      // HTML模板文件
      template: resolve("./public/index.html"),
    }),
  ]
  // ...
}
```

> Npm run build 后生成的html文件会自动引入js

#### 解析react

```bash
npm install react react-dom
```

```bash
//添加babel,loader
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/preset-react core-js@3 -D
```

> 依赖模块说明

| 模块名                          | 描述                                               | 版本     |
| ------------------------------- | -------------------------------------------------- | -------- |
| react                           | 核心代码                                           | ^18.1.0  |
| react-dom                       | 浏览器端实现                                       | ^18.1.0  |
| babel-loader                    | 识别ES6语法，编译js                                | ^8.2.5   |
| @babel/core                     | babel处理的核心逻辑                                | ^7.18.2  |
| @babel/preset-env               | 根据一些预设的目标值转换js语法，会打包一些polyfill | ^7.18.2  |
| @babel/preset-react             | 帮助识别jsx语法，解析react                         | ^7.17.12 |
| @babel/plugin-transform-runtime | 优化解决preset-env打包的polyfill会污染全局的问题   | ^7.18.2  |
| core-js                         | polyfill的核心实现，选择3版本                      | 3        |

> 添加webpack的loader配置

```js
//base.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 匹配js/jsx
        test: /\.jsx?$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: {
          // 确定使用的loader
          loader: "babel-loader",
          // 参数配置
          options: {
            presets: [
              [
                // 预设polyfill
                "@babel/preset-env",
                {
                  // polyfill 只加载使用的部分
                  useBuiltIns: "usage",
                  // 使用corejs解析，模块化
                  corejs: "3",
                },
              ],
              // 解析react
              "@babel/preset-react",
            ],
            // 使用transform-runtime，避免全局污染，注入helper
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      }
    ]
  }
  // ...
}
```

#### 解析CSS和CSS预处理器

```bash
npm install css-loader less less-loader style-loader postcss postcss-loader mini-css-extract-plugin cross-env autoprefixer css-minimizer-webpack-plugin -D
```

> 依赖说明

| 模块名                       | 描述                              | 版本    |
| ---------------------------- | --------------------------------- | ------- |
| css-loader                   | 解析css                           | ^6.7.1  |
| less                         | 支持less语法                      | ^4.1.2  |
| less-loader                  | 解析less                          | ^11.0.0 |
| style-loader                 | 将解析的css内容追加到head中       | ^3.3.1  |
| postcss                      | 好用好玩的css插件，压缩、自动补全 | ^8.4.14 |
| postcss-loader               | 解析postcss设置                   | ^7.0.0  |
| mini-css-extract-plugin      | 分离CSS                           | ^2.6.0  |
| cross-env                    | 好用的环境配置                    | ^7.0.3  |
| autoprefixer                 | 自动补全css属性前缀               | ^10.4.7 |
| css-minimizer-webpack-plugin | 生产环境，压缩css                 | ^4.0.0  |

> webpack配置

```js
//base.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "prod";

module.exports = {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      // 输出的每个css文件名称
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
      // 非入口的chunk文件名 - 通过import()加载异步组件中样式
      chunkFilename: isProd ? "[id].[contenthash].css" : "[id].css",
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          // 生产环境下直接分离打包css
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // 浏览器前缀自动补全
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
    ]
  }

  // ...
}
```

```js
//prod.js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(webpackConfigBase, {
  // ...
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
})
```

> package.json更新scripts，增加环境变量
>
> 通过cross-env配置环境变量参数，跨平台好用

```json
"scripts": {
  "dev": "cross-env NODE_ENV=dev webpack serve --config config/webpack.config.dev",
  "build": "cross-env NODE_ENV=prod webpack build --config config/webpack.config.prod"
},
```

> 改script的原因是因为,我们在base.js中对当前环境进行了判断,所以我们在开发或者打包时,启动需要带环境的命令

#### 解析图片、JSON等其他文件

> webpack5之前一般使用raw-loader,url-loader之类的,webpack5之后,内置提供了一种`资源模块类型(assets module type)`,替换了5之前使用的loader

| 资源模块类型   | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| asset/resource | 发送一个单独的文件，并导出URL，替代file-loader               |
| asset/inline   | 导出一个资源的data URI，替代url-loader                       |
| asset/source   | 导出资源源代码                                               |
| asset          | 相当于自动选择asset/resource或asset/inline，替换url-loader中的limit |

```js
//base.js
module.exports {
 // ...
 output: {
   // ...
   // 指定asset或asset/resource类型文件存储时的命名规则
   // 注意这里设置的是所有的公共的命名处理逻辑
   assetModuleFilename: 'image/[hash][ext][query]'
   // ...
 },
 module: {
   rules: [
     {
       // 匹配图片文件
       test: /\.(png|jpg|jpeg|gif)$/i,
       // 设置资源处理的类型为asset
       type: "asset",
       parser: {
         // 转为inline dataUrl的条件
         dataUrlCondition: {
           // 默认限制为8kb，现在调整限制为10kb，大文件直接作为asset/resource类型文件输出
           maxSize: 10 * 1024,
         },
       },
     },
     {
       // 匹配json文件
       test: /\.json$/,
       // 将json文件视为文件类型
       type: "asset/resource",
       // 路径中包含animations的
       include: /animations/,
       generator: {
         // 这里专门针对json文件的处理
         filename: "static/[name].[hash][ext][query]",
       },
     }
   ]
 }
 // ...
}
```

#### 解析Typescript

```bash
npm install typescript @babel/preset-typescript @types/react @types/react-dom -D
```

> 因为使用babel-loader来编译ts，所以就不用安装ts-loader了

> 依赖说明

| 模块名                   | 描述                    | 版本     |
| ------------------------ | ----------------------- | -------- |
| typescript               | 你说这是啥              | ^4.7.2   |
| @babel/preset-typescript | Babel解析typescript语法 | ^7.17.12 |
| @types/react             | react类型文件           | ^18.0.9  |
| @types/react-dom         | react-dom类型文件       | ^18.0.5  |

> webpack配置

```js
//base.js
module.exports = {
  module:{
    rules:[
      //....
      {
        // 匹配ts/js/tsx/jsx文件
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: "3",
                },
              ],
              // 解析typescript语法
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
        //....
    ]
  }
}

```

> 新建tsconfig.json

```json
//tsconfig.json
// tsconfig.json
{
  "compilerOptions": {
    // 重定向输出目录
    "outDir": "./dist",
    // 在表达式和声明上有隐含的any类型时报错，false表示关闭该规则
    "noImplicitAny": false,
    // 指定生成哪个模块系统下的代码
    "module": "ESNext",
    // 指定ECMAScript目标版本
    "target": "ESNext",
    // 在.tsx文件里支持react
    "jsx": "react",
    // 允许编辑JS文件
    "allowJs": true,
    // 检查JS文件中的错误并报告，需要allowJs配合使用
    "checkJs": true,
    // 模块解析，查找模块的方式
    "moduleResolution": "node",
    // 允许从没有默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // "esModuleInterop": true,
    "resolveJsonModule": true,
    // 模块名基于baseUrl的路径映射列表
    "paths": {
      // 与webpack中声明的@对应，若不声明会导致报查询不到对应模块的错误
      "@": ["./src"],
      // 这个位置与上面区分下，不是一个意思，表示/*表示src下的所有文件
      "@/*": ["./src/*"]
    }
  },
  // 包含编译目录
  "include": ["src/*", "images.d.ts"],
  // 排除编译目录
  "exclude": ["node_modules", "dist"]
}
```

> tsconfig完整规则地址https://www.typescriptlang.org/tsconfig

> ts中图片等文件类型声明

> 在项目中我们引入图片文件 `import smileGif from './smile.gif';`时，vscode会提示`ts 2307 找不到模块“./smile.gif”或其相应的类型声明。`，配置`images.d.ts`文件解决这个问题

```typescript
//images.d.ts
declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "*.txt";

declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const url: string;
  export default url;
}
```

> 最后把index.js改为index.tsx,以及其他js文件改为ts文件

> base.js中的entry改为index.tsx

```js
entry: {
  main: resolve("./src/index.tsx"),
},
```

