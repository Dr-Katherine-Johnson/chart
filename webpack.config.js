const path = require('path');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  entry: './client/src/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new DotenvWebpack()
  ]
}