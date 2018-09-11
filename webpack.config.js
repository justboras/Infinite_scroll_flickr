const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
});

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: 'localhost',
    port: 3002,
  },
  plugins: [HtmlWebpackPluginConfig],
  mode: 'development',
};