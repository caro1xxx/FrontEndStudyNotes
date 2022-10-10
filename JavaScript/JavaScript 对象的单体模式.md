> 对象的单体模式为ES6新增

```js
<script>
    var p = {
        name:'小明',
        fav(){
            console.log(this);
        }
    }
	p.fav();
</script>
```

**对象的单体模式就可以解决箭头函数只想window的坑**

