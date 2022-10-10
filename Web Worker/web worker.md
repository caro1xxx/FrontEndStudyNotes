#### 动机

> 处理耗时的数据操作,并且不影响主线程工作,完全独立于主线程,但是可以和主线程通信,不能操作DOM&BOM

```js
//index.js

let worker = new Worker('work.js');
//listen from work.js's data
worker.addEventListener('message',(e)=>{
  console.log(e)
})

//send work.js data
worker.postMessage(data)
```

```js
//work.js
let result = []
for(let i in 1000000){
  result.push(i)
}

//send data to index.js
self.postMessage(result)

//listen from index.js data
self.addEventListener('message',(e)=>{
  console.log(e)
})
```

