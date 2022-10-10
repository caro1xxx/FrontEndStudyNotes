> 在return jsx语法的时候 在return后面加上()才可以使jsx语法换行

```react
render() {
    return (
        <Fragment>
            <input value={this.state.InputValue} onChange={this.inputChange.bind(this)}/>
            <button onClick={this.addList.bind(this)}>添加</button>
            <ul>
                {
                    this.state.list.map((item,index)=>{
                        return <li key={index+item} onClick={this.deleteList.bind(this,index)}>{item}</li>
                    })
                }
            </ul>
        </Fragment>
    )
  } 
```

> return 后面没有()那么jsx就只能写在一行