import express from 'express'
import React from 'react'
import path from 'path'
import { ServerStyleSheet } from 'styled-components'
import { renderToNodeStream } from 'react-dom/server'
import createCacheStream from './utils/cache'
import App from '../client/App'

const port = 3000
const server = express()

const html = (title) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${ title }</title>
      </head>
      <body>
        <div id="root">
  `
}

server.use(express.static('./dist'))

server.get('*', (req, res) => {
  let cacheStream = createCacheStream(req.path)
  cacheStream.pipe(res)
  cacheStream.write(html('yay'))
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<App />)

  const stream = sheet.interleaveWithNodeStream(
    renderToNodeStream(jsx)
  )

  stream.pipe(cacheStream, { end: false })
  stream.on('end', () => cacheStream.end('</div><script src="bundle.js" async></script></body></html>'))
})

server.listen(port)
console.log(`Serving at http://localhost:${port}`)