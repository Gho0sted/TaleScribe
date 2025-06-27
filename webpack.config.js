// Конфигурация webpack для сборки
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProd = process.env.NODE_ENV === "production";
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    main: "./src/index.tsx",
    sw: "./src/sw.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) =>
      pathData.chunk.name === "sw" ? "sw.js" : "[name].[contenthash].js",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // Правила обработки файлов

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(mp3|wav)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    // анализ бандла только для production-сборки
    ...(isProd
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: "report.html",
          }),
        ]
      : []),
    new CompressionPlugin({
      algorithm: "brotliCompress",
      compressionOptions: { level: 11 },
    }),
    // new (require('clean-webpack-plugin').CleanWebpackPlugin)(),
  ],
  devServer: {
    static: [
      { directory: path.join(__dirname, "public") },
      { directory: path.join(__dirname, "plugins") },
    ],
    hot: true,
  },
};
