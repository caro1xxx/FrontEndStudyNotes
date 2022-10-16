> 如果svg文件在本地

```react
import React, { Component } from 'react';
//引入
import HomeSvg from '../../image/undraw_add_to_cart_re_wrdo.svg' 
class Index extends Component {
  render() {
    return (
      <div>
            {*/使用/*}
        <img src={HomeSvg} alt="" />
      </div>
    );
  }
}

export default Index;
```

