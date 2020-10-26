import React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, // 웹팩(바벨로더)을 이용하여 App 같은 tsx를 사용할 수 있게 만든다
  document.querySelector('#app'),
);
