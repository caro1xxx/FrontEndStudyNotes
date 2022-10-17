> Head和Image为next内置的组件

#### Head

```js
import Head from 'next/head'

export const Navbar = () => {
  return(
  	...
    <Head>
    	<title>某某帖子标题</title>
    </Head>
    
    ....
  )
}
```

主要是用于二级页面的title

注意如果一个应用中出现了多个Head,需要给你Head标签加key

#### image

image为用本地项目中的图片引入,使用html自带的img无法引用public下的,只能引入网络图片