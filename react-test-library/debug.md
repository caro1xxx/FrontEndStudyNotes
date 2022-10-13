```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  //关闭ESLint:testing-library/no-debugging-utils
         
  //eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(); 打印元素
});
```

```html
输出结果
<div>
  <div>
    hello
  </div>
</div>
```

> debug将会打印出在<App>下的所有组件,**就像是在控制台查看element一样**