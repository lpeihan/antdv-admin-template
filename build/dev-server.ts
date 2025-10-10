import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { getLocalIP } from './utils/getLocalIP';
import { clearConsole, info } from './utils/logger';
import { webpackDevConf } from './webpack.dev.conf';

const devServerOptions = webpackDevConf.devServer;
if (!devServerOptions) {
  throw new Error('DevServer options not found');
}

const protocol = (devServerOptions as any).https ? 'https' : 'http';
const host = devServerOptions.host as string;
const port = devServerOptions.port as number;

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
