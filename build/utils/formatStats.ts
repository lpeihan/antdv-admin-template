import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import chalk from 'chalk';
// @ts-ignore
import cliui from 'cliui';
import dayjs from 'dayjs';
import { Stats } from 'webpack';

interface Asset {
  name: string;
  size: number;
}

export default function formatStats(stats: Stats, dir: string): string {
  const ui = cliui({ width: process.stdout.columns || 80 });

  const json = stats.toJson({
    hash: false,
    modules: false,
    chunks: false,
  });

  let assets = json.assets
    ? json.assets
    : json.children?.reduce((acc: Asset[], child) => acc.concat(child.assets || []), []) || [];

  const seenNames = new Map();
  const isJS = (val: string): boolean => /\.js$/.test(val);
  const isCSS = (val: string): boolean => /\.css$/.test(val);
  const isMinJS = (val: string): boolean => /\.min\.js$/.test(val);

  assets = assets
    .map((a) => {
      a.name = a.name.split('?')[0];
      return a;
    })
    .filter((a) => {
      if (seenNames.has(a.name)) {
        return false;
      }
      seenNames.set(a.name, true);
      return isJS(a.name) || isCSS(a.name);
    })
    .sort((a, b) => {
      if (isJS(a.name) && isCSS(b.name)) return -1;
      if (isCSS(a.name) && isJS(b.name)) return 1;
      if (isMinJS(a.name) && !isMinJS(b.name)) return -1;
      if (!isMinJS(a.name) && isMinJS(b.name)) return 1;
      return b.size - a.size;
    });

  function formatSize(size: number): string {
    return (size / 1024).toFixed(2) + ' KiB';
  }

  function getGzippedSize(asset: Asset): string {
    const filepath = path.resolve(process.cwd(), path.join(dir, asset.name));
    const buffer = fs.readFileSync(filepath);
    return formatSize(zlib.gzipSync(buffer).length);
  }

  function makeRow(a: string, b: string, c: string): string {
    return `  ${a}\t    ${b}\t ${c}`;
  }

  ui.div(
    makeRow(chalk.cyan.bold(`File`), chalk.cyan.bold(`Size`), chalk.cyan.bold(`Gzipped`)) +
      `\n\n` +
      assets
        .map((asset) =>
          makeRow(
            /js$/.test(asset.name)
              ? chalk.green(path.join(dir, asset.name))
              : chalk.blue(path.join(dir, asset.name)),
            formatSize(asset.size),
            getGzippedSize(asset),
          ),
        )
        .join(`\n`),
  );

  const time = (stats.endTime || 0) - (stats.startTime || 0);
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const hash = stats.hash;
  const info = `Build at: ${chalk.white(now)} - Hash: ${chalk.white(hash)} - Time: ${chalk.white(
    time,
  )}ms`;

  return `${ui.toString()}\n\n  ${chalk.gray(
    `Images and other types of assets omitted.`,
  )}\n  ${info}\n`;
}
