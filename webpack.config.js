"use strict";

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = ({ mode }) => {
  return {
    target: ["browserslist"],
    stats: "errors-warnings",
    mode: "production", // Ensure production mode is set for optimizations
    entry: "./src/index.js", // Assuming your entry point is in `src/index.js`
    output: {
      filename: "form-validator.min.js", // Minified output file name
      path: path.resolve(__dirname, "dist"), // Use `dist` for distribution builds
      publicPath: "/", // For CDN, base path can be adjusted as needed
      library: "FormValidator", // Expose your form validation class as a library
      libraryTarget: "umd", // Universal Module Definition for CDN and Node.js compatibility
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: { extensions: [".js", ".jsx"] },
          use: { loader: "babel-loader" }, // Transpile ES6+ code
        },
      ],
    },
    optimization: {
      minimize: true, // Enable minification
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: true, // Compress the code
            output: {
              comments: false, // Remove comments in minified output
            },
          },
          extractComments: false, // Don't generate a separate license file
        }),
      ],
    },
    plugins: [], // Add any additional plugins if needed (like for analyzing or defining env variables)
  };
};
