// Конфигурация webpack для сборки
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx',
    sw: './src/sw.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
    // Правила обработки файлов

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    static: [
      { directory: path.join(__dirname, 'dist') },
      { directory: path.join(__dirname, 'public') },
    ],
    hot: true,
  },
};
