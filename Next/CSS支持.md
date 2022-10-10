#### 全局样式

```js
//pages/_app.js
import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

#### 从`node_modules`导入样式

一样只能往_app.js内引入才生效

```js
//pages/_app.js
import ''bootstrap/dist/css/bootstrap.css''

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

> 如果是第三方的css,那么在组件内引入即可

```js
// components/myComponents.js
import { useState } from 'react'
import { Dialog } from '@reach/dialog';
...
```

#### 组件级CSS

Next支持对组件内css进行命名空间

> 例子:Button.module.css

```bash
component/
			Button.js
			Button.module.css
```

对css进行命名空间后,**不同style文件使用同一个类名也不会冲突**

#### sass支持

Next内置sass支持,同样sass也可以进行组件级 Sass 

```bash
npm install sass
```

#### CSS in JS

**支持任何现有的 CSS-in-JS 解决方案**

