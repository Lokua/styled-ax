const webpack = require(`webpack`)

module.exports = {
  devtool: `cheap-module-source-map`,
  entry: {
    'styled-ax': `./src/index.js`,
    'styled-ax.min': `./src/index.js`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: `[name].js`,
    library: `styledAx`,
    libraryTarget: `umd`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: `babel-loader`
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: `cheap-module-source-map`
    })
  ]
}
