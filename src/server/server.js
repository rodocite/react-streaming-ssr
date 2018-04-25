import express from 'express'
import React from 'react'
import cors from 'cors'
import path from 'path'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter, matchPath } from "react-router-dom"
import createCacheStream from './utils/cache'
import routes from '../shared/routes'
import App from '../client/App'

const port = 3000
const server = express()

const html = '<!DOCTYPE html><html><meta name="viewport" content="width=device-width"/><head><style>body{font-size:62.5%;margin:0;min-height:100vh;}</style><meta charset="utf-8"><title>React Streaming SSR</title></head><body><div id="root">'

server.use(cors())

server.use(express.static('./dist'))

server.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route))
  const promise = activeRoute && activeRoute.getInitialProps
    ? activeRoute.getInitialProps()
    : Promise.resolve()

  promise.then((data) => {
    let cacheStream = createCacheStream(req.path)
    cacheStream.pipe(res)
    cacheStream.write(html)
    const sheet = new ServerStyleSheet()

    const jsx = sheet.collectStyles(
      <StaticRouter location={req.url} context={{ data }}>
        <App />
      </StaticRouter>
    )

    const stream = sheet.interleaveWithNodeStream(
      renderToNodeStream(jsx)
    )

    stream.pipe(cacheStream, { end: false })
    stream.on('end', () => cacheStream.end(`</div><script src="bundle.js" async></script>${data ? '<script>window.__INITIAL_DATA__ = ' + serialize(data) : ''}</script></body></html>`))
  }).catch(next)
})

server.listen(port)
console.log(`Serving at http://localhost:${port}`)