const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const browserConfig = {
  entry: {
    bundle: './src/client/index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'development'`
      },
      __isBrowser__: 'true'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }
    ]
  }
}

const serverConfig = {
  entry: {
    server: './src/server/server.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'development'`
      },
      __isBrowser__: 'false'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }
    ]
  }
}

module.exports = [browserConfig, serverConfig]