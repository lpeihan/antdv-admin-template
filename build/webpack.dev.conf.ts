import ProgressPlugin from 'progress-webpack-plugin';
import { merge } from 'webpack-merge';

import cssConf from './css.conf';
import webpackBaseConf from './webpack.base.conf';

export const webpackDevConf = merge(webpackBaseConf, cssConf, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  plugins: [new ProgressPlugin(true)],

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    open: false,
    host: '0.0.0.0',
    port: 8093,
    hot: true,
    client: {
      overlay: false,
      webSocketTransport: 'ws',
      reconnect: true,
    },
    proxy: [
      {
        context: ['/v1'],
        target: 'http://43.198.71.208:8080',
      },
    ],
    setupMiddlewares(middlewares, devServer) {
      require('../mocks/index')(devServer.app);
      // devServer.app.use('/__open-in-editor', openInEditor());

      return middlewares;
    },
  },

  infrastructureLogging: {
    level: 'warn',
  },

  stats: {
    assets: false,
    modules: false,
  },
});
