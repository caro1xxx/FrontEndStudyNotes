> 关于super

> 在子类继承父类时,如果子类需要使用父类的属性,在父类的属性的**基础上再添加**一些属性,那么就需要super

```js
class Person {
	constructor(name){
		this.name = name;
    }
}
//子类
class Child extend Person {
	constructor(name,age){
		super(name); //这里就是用的父类的name,所以需要super
        this.age=age;
    }
}
```

> 注意:**super的属性必须在所有属性的前面.**

