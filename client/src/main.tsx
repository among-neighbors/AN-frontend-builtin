import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './others/store';
import Router from './Router';
import { GlobalStyle } from './others/cssLibrary';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  </>,
);
