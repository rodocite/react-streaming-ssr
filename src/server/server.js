import express from 'express'
import React from 'react'
import cors from 'cors'
import path from 'path'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { renderToNodeStream } from 'react-dom/server'
import createCacheStream from './utils/cache'
import App from '../client/App'

const port = 3000
const server = express()

const html = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React Streaming SSR</title>
      </head>
      <body>
        <div id="root">
  `
}

server.use(cors())

server.use(express.static('./dist'))

server.get('*', (req, res) => {
  let cacheStream = createCacheStream(req.path)
  cacheStream.pipe(res)
  cacheStream.write(html())
  const sheet = new ServerStyleSheet()
  const data = 'Data'
  const jsx = sheet.collectStyles(<App data={ data } />)

  const stream = sheet.interleaveWithNodeStream(
    renderToNodeStream(jsx)
  )

  stream.pipe(cacheStream, { end: false })
  stream.on('end', () => cacheStream.end(`
        </div>
        <script src="bundle.js" async></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </body>
    </html>
  `))
})

server.listen(port)
console.log(`Serving at http://localhost:${port}`)