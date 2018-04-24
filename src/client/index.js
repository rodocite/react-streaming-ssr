import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

hydrate(<App data={ window.__INITIAL_DATA__ } />, document.getElementById('root'))