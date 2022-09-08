const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/i,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ],
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css'
    }),
  ],
};
