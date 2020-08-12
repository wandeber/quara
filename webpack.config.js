module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  output: {
    path: __dirname + "/dist",
    //publicPath: "/",
    filename: "quara.js",
    libraryTarget: "umd",
    library: "Quara",
    auxiliaryComment: "@author Bernardo A. Siverio (wandeber)",
    globalObject: "this"
  }
};
