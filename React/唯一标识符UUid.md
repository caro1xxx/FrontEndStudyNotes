> UUid可以生成唯一标识符,全世界都找不到重复的
>
> 可以安装uuid这个库使用

```bash
//uuid这个库比较大
npm i uuid
//推荐使用这个库,比较小
npm i nanoid
```

```react
import {nanoid} from 'nanoid'
//nanoid是分别暴露的,引入之后就可以使用nanoid这个函数
//生成一个字符串,并且保证全球唯一
nanoid()
```

