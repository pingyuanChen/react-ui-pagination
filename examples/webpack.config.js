const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

module.exports = {
  entry: path.join(srcDir, 'index.jsx'),
  output: {
    path: buildDir,
    filename: 'main.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    port: 9009
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.join(srcDir, '/index.html')
    }),
    new ExtractTextPlugin('css/[hash:8].[name].css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded'),
        include: srcDir
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: srcDir,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=5120&name=img/[hash:8].[name].[ext]',  // return Data URL if smaller than 5k, otherwise use file-loader
        include: srcDir
      }
    ]
  }
}