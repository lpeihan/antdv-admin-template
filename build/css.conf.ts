import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './utils';

const isProd = process.env.NODE_ENV === 'production';

const plugins = [];
if (isProd) {
  const filename = 'css/[name].[contenthash:8].css';

  plugins.push(
    new MiniCssExtractPlugin({
      filename,
      chunkFilename: filename,
    }),
  );
}

const genStyleRules = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // how many loaders before css-loader should be applied to [@import]ed resources.
      // stylePostLoader injected by vue-loader + postcss-loader
      importLoaders: 1 + 1,
      esModule: false, // css-loader using ES Modules as default in v4, but vue-style-loader support cjs only.
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions(loaderContext) {
        const resourcePath = loaderContext.resourcePath;

        if (resourcePath.includes('/admin/')) {
          return {
            config: resolve('src/admin/postcss.config.mjs'),
          };
        }

        return {
          config: resolve('postcss.config.mjs'),
        };
      },
    },
  };
  const extractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
  };
  const vueStyleLoader = {
    loader: 'vue-style-loader',
  };

  function createCSSRule(test, loader?, loaderOptions?) {
    const loaders: any[] = [cssLoader, postcssLoader];

    if (isProd) {
      loaders.unshift(extractPluginLoader);
    } else {
      loaders.unshift(vueStyleLoader);
    }

    if (loader) {
      loaders.push({ loader, options: loaderOptions });
      loaders.push({
        loader: 'style-resources-loader',
        options: {
          patterns: [
            // resolve('src/styles/mixins.less'), resolve('src/styles/vars.less')
          ],
        },
      });
    }

    return { test, use: loaders };
  }

  return [
    createCSSRule(/\.css$/),
    createCSSRule(/\.p(ost)?css$/),
    createCSSRule(/\.less$/, 'less-loader'),
  ];
};

export default {
  plugins,
  module: {
    rules: genStyleRules(),
  },
};
