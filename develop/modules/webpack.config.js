const path = require('path');

module.exports = {
  name: 'tictactoe',
  mode: 'development', // 실서비스: production
  devtool: 'eval', // 실서비스: hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ["last 2 versions", "ie 10"], // browerslist
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
      }, {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(woff2?|ttf|otf|eot|svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [],

  devServer: {
    // hot: true,
    // host: 'localhost',
    port: 80
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
}