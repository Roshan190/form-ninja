const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/script.ts", // Adjust to point to your main TS file
  output: {
    filename: "form-ninja.min.js", // Minified output
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.build.json", // Use the new config for Webpack
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true, // Enable minification
    minimizer: [new TerserPlugin()], // Use Terser for minification
  },
  mode: "production", // Set to production mode to enable optimizations
};
