#### cacheFirst策略

> 缓存优先,首次使用网络,后面全使用缓存

#### networkFirst策略

> 网络优先,不管是否有缓存,只要有网络就用网络,没网络采用缓存

> 在PWA中,主要是用于将网络请求通过service worker存入caches

```js
async function networkFirst(req){
  try{ 
    const res = fetch(req);
    return res
  }catch(e){
    const cache = caches.open(cache_name)
    //拿着接受的req去缓存库能匹配,匹配到就返回出去
    const cahced = cache.match(req)
    return cahced 
  }
}
```



#### 开启缓存

```js
//返回一个promise
caches.opne(缓存名)
//or
const cache = await caches.opne(缓存名)
```

#### 抓取一个数组,并存起来

```js
caches.addAll(array)
```

> 存静态资源

```js
const CHACHE_NAME = "chache_v1"

const cache = await caches.open(CHACHE_NAME)

await cache.addAll([
  //这里注意:一定不要缓存首页html路径,而是换成'/'
  '/',
  '/js/index.js',
  '/css/index.css',
  ...
])
```

> 在chrom -> Application -> cache storage 查看缓存的资源

#### 遍历缓存

```js
caches.keys()
```

#### 删除缓存

```js
caches.delete(key ) 
```

#### caches+fetch(生命周期)

```js
self.addEventListener('fetch',(event)=>{
  //请求对象
  const req = event.resquest;
  //将响应返回给浏览器
  event.respondWith(networkFirst(req))
})

async function networkFirst(req){
  try{ 
    const res = await fetch(req);
    return res
  }catch(e){
    const cache = await caches.open(cache_name)
    //拿着接受的req去缓存库能匹配,匹配到就返回出去
    const cahced = await cache.match(req)
    return cahced 
  }
}
```

