const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.local.config');

/* eslint-disable no-console */
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
}).listen(3000, config.ip, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at ${config.ip}:3000`);
});
/* eslint-enable no-console */
