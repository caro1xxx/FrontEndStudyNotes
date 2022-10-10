> Range:给定一个长度生成一个Seq
>
> Range(start:number,end:number,step:number)

```js
const {Range} = require('immutable')

const r = Range(1,5,1);
```

> Repeat:重复生成n个值的Seq
>
> Repeat(value,times)

```js
const {Repeat} = require('immutable')

const r = Repeat(66,2);

//Repeat { _value: 66, size: 2 }
```

