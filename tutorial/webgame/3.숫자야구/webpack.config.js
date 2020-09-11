const path = require('path');

module.exports = {
  name: 'number-baseball',
  mode: 'development', // 실서비스: production
  devtool: 'eval', // 실서비스: hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browerslist
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel',
        ],
      },
    }],
  },

  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/', // 가상경로
  },
}