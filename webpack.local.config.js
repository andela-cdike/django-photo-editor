const BundleTracker = require('webpack-bundle-tracker');
const config = require('./webpack.base.config.js');
const path = require('path');
const webpack = require('webpack');


const ip = 'localhost';

config.entry = {
  App1: [
    `webpack-dev-server/client?http://${ip}:3000`,
    'webpack/hot/only-dev-server',
    './reactjs/App1',
  ],
};

config.output.publicPath = `http://${ip}:3000/assets/bundles/`;

config.devtool = '#eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({ filename: './webpack-stats-local.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_API_URL: JSON.stringify(`https://${ip}:8000/photo-magick/`),
    },
  }),
]);

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel', 'eslint-loader'],
  }
);

module.exports = config;
