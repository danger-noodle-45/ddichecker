const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
      publicPath: '/'
    },
    port: 8080,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/user/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/rx/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
          },
        },
      },
      {
        test: /\.css?/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
