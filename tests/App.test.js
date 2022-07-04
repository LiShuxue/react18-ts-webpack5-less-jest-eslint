import React from 'react';
import { render } from '@testing-library/react';
import App from 'src/App';

it('render without crashing', async () => {
  render(<App />); // 如果这里没有报错就代表测试通过，不用添加断言。
});
