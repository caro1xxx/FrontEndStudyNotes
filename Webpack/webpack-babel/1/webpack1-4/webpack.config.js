var path = require('path');

module.exports = {
  entry: './a.js',  // a.js里引入了CSS文件
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  mode: 'none'
};