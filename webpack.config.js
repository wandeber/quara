/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require("terser-webpack-plugin");
const {BannerPlugin} = require("webpack");





const indexSettings = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: "ts-loader",
        exclude: /node_modules/u
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node",
  output: {
    path: `${__dirname}/dist`,
    filename: "quara.js",
    libraryTarget: "umd",
    library: "Quara",
    auxiliaryComment: "@author Bernardo A. Siverio (wandeber) <berthewanderer@gmail.com>",
    globalObject: "this"
  },
  plugins: [
    new BannerPlugin({
      banner: "Quara: Query as Sara.\n"
        +"@licence ISC\n"
        +"@author Bernardo A. Siverio (wandeber) <berthewanderer@gmail.com>",
      //raw: boolean, // if true, banner will not be wrapped in a comment
    })
  ]
};

const shellSettings = {...indexSettings};
shellSettings.entry = "./src/shell.ts";
shellSettings.output = {...indexSettings.output};
shellSettings.output.filename = "quara.shell.js";



module.exports = [indexSettings, shellSettings];
