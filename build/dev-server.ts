import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { clearConsole, getLocalIP, info } from './utils';
import { webpackDevConf } from './webpack.dev.conf';

const devServerOptions = webpackDevConf.devServer;
if (!devServerOptions) {
  throw new Error('DevServer options not found');
}

// @ts-ignore
const protocol = devServerOptions.https ? 'https' : 'http';
const host = devServerOptions.host;
const port = devServerOptions.port;

info('Starting development server...');

const compiler = webpack(webpackDevConf);
const server = new WebpackDevServer(devServerOptions, compiler);

compiler.hooks.done.tap('serve', (stats) => {
  if (stats.hasErrors()) {
    return;
  }
  clearConsole();
  console.log();
  console.log();
  console.log(`App running at:`);
  console.log(`  - Local:   ${chalk.cyan(`${protocol}://localhost:${port}`)}`);
  console.log(`  - Network: ${chalk.cyan(`${protocol}://${getLocalIP()}:${port}`)}`);
  console.log();
});

// @ts-ignore
server.start(port, host).catch((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
