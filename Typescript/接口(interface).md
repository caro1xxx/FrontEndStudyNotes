> 接口是一系列**抽象方法的声明**，是一些方法特征的集合，这些方法都应该是**抽象的**，需要由**具体的类去实现**，然后第三方就可以通过这组抽象方法调用，**让具体的类执行具体的方法**

```typescript
//typescript接口定义
interface interface_name { 
}
```

> 定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。
>
> customer 实现了接口 IPerson 的属性和方法

```typescript
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

> **接口不能转换为 JavaScript。 它只是 TypeScript 的一部分**

#### 联合类型和接口

```typescript
interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
} 
 
// commandline 是字符串
var options:RunOptions = {program:"test1",commandline:"Hello"}; 
console.log(options.commandline)  
 
// commandline 是字符串数组
options = {program:"test1",commandline:["Hello","World"]}; 
console.log(options.commandline[0]); 
console.log(options.commandline[1]);  
 
// commandline 是一个函数表达式
options = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
 
var fn:any = options.commandline; 
console.log(fn());
```

#### 接口继承

> 接口继承就是说接口可以通过其他接口来扩展自己
>
> Typescript **允许接口继承多个接口**
>
> **继承使用关键字 extends**

##### 单接口继承语法格式

```typescript
Child_interface_name extends super_interface_name
```

##### 多接口继承语法格式

```typescript
Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
```

> **继承的各个接口使用逗号 , 分隔**

#### 只读属性

> 使用readnoly让接口内的属性变为只读

```ts
interface IPerson {
  readonly id: number,
  name: string
};
const person: IPerson = {
  id:1,
  name:'林俊杰'
}
//报错
person.id = 100
```

![image-20210930111017868](接口(interface).assets/image-20210930111017868.png)

#### 可选属性

> 使用?让属性变为可有可无

```ts
interface IPerson {
  id?: number,
  name: string
};
const person: IPerson = {
  name:'林俊杰'
}
```

#### 函数类型

> 函数类型:通过**接口的方式作为函数的类型来使用**

> 为了使用**接口表示**函数类型,我们需要**给接口定义**一个**调用签名**
>
> 它就像是一个**只有参数列表和返回值类型的函数定义**,参数列表里面的**每个参数都需要**名字和类型

```ts
// 定义一个接口,用来作为某个函数的类型使用
interface IPerson {
  // 定义调用签名
  (para1: string,para2: string): boolean
};
// 定义函数,该类型就是上面定义的接口
const searchString: IPerson = (para1: string,para2: string): boolean => {
  // 在para1字符串中查找para2字符串
  return para1.search(para2) > -1
}
console.log(searchString('你好','你'));
```

#### 类类型

> 类 类型: 类的类型,**类的类型可以通过接口来实现**

