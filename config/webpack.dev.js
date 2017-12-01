var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = {
  devtool: false,
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/index')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    publicPath: 'http://localhost:3012/build/',
    chunkFilename: '[name].js'
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.join(__dirname, '../src')
    ],
    alias: {
      'actions': path.resolve(__dirname, '../src/actions'),
      'components': path.resolve(__dirname, '../src/components'),
      'containers': path.resolve(__dirname, '../src/containers'),
      'reducers': path.resolve(__dirname, '../src/reducers'),
      'utils': path.resolve(__dirname, '../src/utils')
    }
  },

  module: {
    rules: [{
      test: /\.js?$/,
      use: ['babel-loader'],
      exclude: /(node_modules)/
    }, {
      test: /\.(png|jpg|gif|md)$/,
      use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=images/svg+xml']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }]

  },
  devServer: { // webpack-dev-server配置热更新以及跨域
    historyApiFallback: true, // 不跳转
    noInfo: true,
    inline: true, // 实时刷新
    port: '3012',
    hot: true,
    proxy: {
      '/list': {
        target: 'http://hjy.cc.com',
        pathRewrite: {'^/list': ''},
        changeOrigin: true,
        secure: false
      }
    }
  }
}
baseConfig.module.rules.push({
  test: /\.(less|css)$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        minimize: true // css压缩
      }
    }, 'less-loader']
  })
})

baseConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor', // 和上面配置的入口对应
    minChunks: 2
  }),
  new ExtractTextPlugin('styles.css'),
  new webpack.HotModuleReplacementPlugin()
)
module.exports = baseConfig
