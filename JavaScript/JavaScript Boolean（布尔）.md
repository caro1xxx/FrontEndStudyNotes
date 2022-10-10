Boolean（布尔）对象用于将非布尔值转换为布尔值（true 或者 false）

## 创建 Boolean 对象

Boolean 对象代表两个值:"true" 或者 "false"

下面的代码定义了一个名为 myBoolean 的布尔对象：

```JS
var myBoolean=new Boolean();
```

如果布尔对象无初始值或者其值为:

- 0
- -0
- null
- ""
- false
- undefined
- NaN

那么对象的值为 false。否则，其值为 true（即使当变量值为字符串 "false" 时）

 

