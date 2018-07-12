const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

const convert = require("koa-connect")
const history = require("connect-history-api-fallback")

const resolve = _ => path.resolve(process.cwd(), _)

module.exports = {
  mode: "development",
  entry: resolve("src/index.js"),
  output: {
    path: resolve("build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      PUBLIC_URL: JSON.stringify("/")
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve("public/index.html")
      // favicon: resolve("public/favicon.png")
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/[name].[hash:4].[ext]"
            }
          },
          {
            loader: "file-loader",
            exclude: /\.(js|html|json)$/,
            options: {
              name: "static/[name].[hash:4].[ext]"
            }
          }
        ]
      }
    ]
  },
  node: {
    setImmediate: false,
    process: "mock",
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  serve: {
    add: (app, middleware, options) => {
      app.use(convert(history()))
    },
    open: true,
    dev: {
      logLevel: "warn"
    },
    logLevel: "warn"
  }
}
