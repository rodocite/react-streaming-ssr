import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../client/App'

const renderMethod = process.env.NODE_ENV === 'development' ? render : hydrate

renderMethod(
  <BrowserRouter>
    <App data={window.__INITIAL_DATA__} />
  </BrowserRouter>,
  document.getElementById('root')
);