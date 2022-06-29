const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
var mode = process.env.NODE_ENV || "production";

module.exports = {
  entry: {
    entry: "./src/index.js",
  },
  output: {
    filename: "build/static/js/Survey.js",
  },
  // devtool: mode === "development" ? "inline-source-map" : false,
  mode: mode,

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        loader: "file-loader",
        include: [/fonts/],

        options: {
          name: "[hash].[ext]",
          outputPath: "css/",
          publicPath: (url) => "../css/" + url,
        },
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
