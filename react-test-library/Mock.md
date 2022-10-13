#### 例子

```js
import React from 'react';
//引入axios
import axios from 'axios';
import { render, screen } from '@testing-library/react';
//用于模拟用户点击发起请求
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
//jest mock操作
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    //本地数据模拟
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    //模拟请求
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );
 
    render(<App />);
 		
    //模拟用户点击按钮
    await userEvent.click(screen.getByRole('button'));
 
    //异步查询是否渲染了本地模拟得response数据
    const items = await screen.findAllByRole('listitem');
 
    //断言
    expect(items).toHaveLength(2);
  });
});
```



