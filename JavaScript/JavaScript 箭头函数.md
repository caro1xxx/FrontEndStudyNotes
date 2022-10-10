> 箭头函数为ES6新增

```js
<script>
    // ES5写法
    var f = function(a){
        return a;
    }

    // ES6
    // 在只有一个参数的时候括号可以省略，但是在多个参数时需要括号
    // 如:(a,b,c,d)
    var f = (a) => a;  // => a 这个a代表返回的a

</script>
```

> 使用箭头函数需注意

```js
// 箭头函数的一个坑
        var p = {
            name:'小明',
            fav:()=>{
                console.log(this)
                console.log(this.name) //这里指向的是window，而不是定义时的name
            }
        }
        p.fav();
```

