/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require("terser-webpack-plugin");
const {BannerPlugin} = require("webpack");





const indexSettings = {
  entry: "./src/index.ts",
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: "ts-loader",
        exclude: /node_modules/u,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // 27.078 bytes (29 KB en el disco)
          // mangle: {
          // keep_classnames: /Quara/,
          // keep_fnames: false,
          // properties: {
          //   reserved: ["script", "run"],
          // },
          // },

          // 27.064 bytes (29 KB en el disco)
          // mangle: {properties: true},

          // 34.814 bytes (37 KB en el disco)
          // keep_classnames: /Quara/,
          // keep_fnames: true, // Peligroso...

          // 34.905 bytes (37 KB en el disco)
          // keep_classnames: /Quara/,
          // keep_fnames: true,

          // 34.513 bytes (37 KB en el disco)
          // keep_classnames: /Quara/,
          // keep_fnames: true,

          // 36.058 bytes (37 KB en el disco)
          keep_classnames: true,
          keep_fnames: true,
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  target: "node",
  output: {
    path: `${__dirname}/dist`,
    filename: "quara.js",
    libraryTarget: "umd",
    library: "Quara",
    auxiliaryComment: "@author Bernardo A. Siverio (wandeber) <berthewanderer@gmail.com>",
    globalObject: "this",
  },
  plugins: [
    new BannerPlugin({
      banner: "Quara: Query as Sara.\n"
        +"@licence ISC\n"
        +"@author Bernardo A. Siverio (wandeber) <berthewanderer@gmail.com>",
    }),
  ],
};

const shellSettings = {...indexSettings};
shellSettings.entry = "./src/shell.ts";
shellSettings.output = {...indexSettings.output};
shellSettings.output.filename = "quara.shell.js";



module.exports = [indexSettings, shellSettings];
