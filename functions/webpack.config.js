const path = require('path');
const nodeExternals = require('webpack-node-externals');

const outputPath = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: 'index.js', // <-- Important
    libraryTarget: 'this', // <-- Important
  },
  target: 'node', // <-- Important
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.js$/,
        use: 'imports-loader?define=>false',
        include: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: [
    nodeExternals({
      modulesDir: '../node_modules',
      whitelist: [/^@impr3siones/],
    }),
  ],
  node: {
    __dirname: false,
  },
};
