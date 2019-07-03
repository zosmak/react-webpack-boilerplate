const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = env => {
  const devMode = process.env.NODE_ENV !== "production";

  // user different .env files
  const currentPath = path.join(__dirname);
  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index_bundle.js",
      publicPath: "/"
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6
          }
        }),
        new OptimizeCSSAssetsPlugin()
      ],
      splitChunks: {
        // include all types of chunks
        chunks: "all"
      }
    },

    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WebpackBar()
    ],
    devtool: "source-map",
    devServer: {
      historyApiFallback: true,
      hot: true
    },

    module: {
      rules: [
        {
          test: /\.(ico|gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true,
                disable: true
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.less$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            { loader: "less-loader", options: { javascriptEnabled: true } }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: "url-loader?limit=100000"
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    }
  };
};
