const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const browserConfig = {
  entry: {
    bundle: './src/client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env': {
      //   NODE_ENV: `'production'`
      // }
      __isBrowser__: 'true'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

const serverConfig = {
  entry: {
    server: './src/server/server.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env': {
      //   NODE_ENV: `'production'`
      // }
      __isBrowser__: 'false'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = [browserConfig, serverConfig]