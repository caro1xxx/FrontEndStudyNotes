const path = require('path');

module.exports = {
  entry: './a.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/dist/',
    open: true,
    compress: true,
    hot: false,
    port: 8089,
  },
  devtool: 'source-map',
  mode: 'none'
};