> 使用TSDX库

#### 全局安装tsdx

```bash
npm install -g tsdx
```

#### 创建tsdx模板

```bash
npx tsdx create [包名]
```

#### 下载依赖

* 根目录下进行npm install
* example/下npm install

#### 启动项目

tsdx生成的模板需要启动两个shell

*一个shell打开项目根目录,用于我们编写的源码打包大dist下*

```bash
npm run start
```

*另外一个shell打包example下,用于监听dist发生变化,将变化输出到example下,然后进行查看*

```bash
npm run start
```

> example启动的项目我们在浏览器中打卡localhost:1234就可以查看到我们在src下编写的实际想过,并且这也将是我们上传npm后下载的实际效果

#### **bug**

需要将example下package.json中的

```bash
"parcel": "^1.12.3",
改为下面的
"parcel": "1.12.3",
```

> 需要注意的是在example/index.tsx中引入的from ''../."
>
> 这句话的意思就是查找根目录下,但是在根目录下有package.json,所以会根据package.json中的main来查找

#### 打包上传npm

在`npm pub`时就会把`dist`上传到npm上

*确定在根目录下的package.json中的name字段包名还没有被别人上传*

```bash
npm build
```

```bash
npm login
```

```bash
npm publish
```

