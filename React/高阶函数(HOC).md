> 高阶函数:
>
> 如果一个函数符合下面2个规范中的**任何一个**,那么该函数就是高阶函数
>
> 1. 如A函数:**接收的参数**是一个函数,那么A就可以称之为高阶函数
> 2. 如A函数:**调用**的**返回值依然是一个函数**,那么A就可以称之为高阶函数
>
> 常见高阶函数有:Promise,setTimeout,arr.map()等等....

```react
import React, { Component } from "react";
class GaojieFunc extends Component {
  saveForm = (dataType) => {
    //这里是把一个函数return出去供onChange调用
    return (event)=>{
      this.setState({
        //这里用传进来的username作为对象键名就必须加[]
        [dataType]:event.target.value
      })
    }

  };
  render() {
    return (
      <div>
                                            {/* 这里onChange调用的是saveForm函数,但是给了参数username,那么
                                              onChange接收到的就是一个参数,那么我们需要在saveForm函数内return出来
                                              一个函数供onChange调用,这就是高阶函数
                                            */}
        <input type="text" name="username" onChange={this.saveForm('username')}></input>
        <input type="password" name="password" onChange={this.saveForm('password')}></input>
      </div>
    );
  }
}

export default GaojieFunc;

```

