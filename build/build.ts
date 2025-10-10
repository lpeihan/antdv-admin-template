import CompressionPlugin from 'compression-webpack-plugin';
import { rimraf } from 'rimraf';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// @ts-ignore
import formatStats from './utils/formatStats';
import { done, error } from './utils/logger';
import { resolve } from './utils/paths';
import { logWithSpinner, stopSpinner } from './utils/spinner';
import { webpackProdConf } from './webpack.prod.conf';

logWithSpinner('Building for production...\n');

rimraf(resolve('dist')).then(() => {
  if (process.env.npm_config_report) {
    webpackProdConf.plugins?.push(new BundleAnalyzerPlugin());
  }

  if (process.env.gzip) {
    webpackProdConf.plugins?.push(new CompressionPlugin());
  }

  webpack(webpackProdConf, (err, stats) => {
    stopSpinner(false);

    if (err) throw err;

    if (!stats) {
      error('Build failed: No stats available.\n');
      process.exit(1);
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );

    if (stats.hasErrors()) {
      error('Build failed with errors.\n');
      process.exit(1);
    }

    console.log(formatStats(stats as any, 'dist'));

    done('Build complete.\n');
  });
});
