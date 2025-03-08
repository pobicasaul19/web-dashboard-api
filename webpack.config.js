import path from 'path';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  target: 'node',
  mode: 'production',
  entry: './server.js',
  externals: {
    lowdb: 'commonjs lowdb',
    express: 'commonjs express',
    'swagger-jsdoc': 'commonjs swagger-jsdoc',
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  stats: {
    errorDetails: true,
    warningsFilter: [
      /express\/lib\/view/,
      /swagger-jsdoc\/src\/utils/,
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      url: 'url',
      buffer: 'buffer',
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /swagger-jsdoc\/src\/utils/,
    }),
  ],
};
