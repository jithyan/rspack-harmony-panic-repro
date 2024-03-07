const rspack = require("@rspack/core");

const isDev = process.env.NODE_ENV === "development";
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  mode: "production",
  context: __dirname,
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    extensions: ["...", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: false,
                },
              },
              env: {
                targets: "chrome >= 87",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
  ],
};
