const SWPrecachePlugin = require("sw-precache-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

const resolve = _ => path.resolve(process.cwd(), _ || "")
const public_URL = "/sw-planet-quiz/"

module.exports = {
  mode: "production",
  entry: resolve("src/index.js"),
  output: {
    path: resolve("build"),
    filename: "static/js/[name].[hash:8].js",
    publicPath: public_URL
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      PUBLIC_URL: public_URL
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve("public/index.html"),
      favicon: resolve("public/favicon.png"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new SWPrecachePlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      navigateFallback: `${public_URL}index.html`,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      filename: "sw.js",
      minify: true
    }),
    new CleanWebpackPlugin(["build"], {
      root: resolve(),
      exclude: ["icon.png"]
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
              name: "static/img/[name].[hash:8].[ext]"
            }
          },
          {
            loader: "file-loader",
            exclude: /\.(js|html|json)$/,
            options: {
              name: "static/media/[name].[hash:8].[ext]"
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
  }
}
