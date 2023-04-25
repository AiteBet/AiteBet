const path = require("path");
const HtmlWebppackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: path.join(__dirname, "client", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebppackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    // hot: true,
    historyApiFallback: true,
  },
};
