import EventEmitter from 'events';
import readline from 'readline';

import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

export const events = new EventEmitter();

function log(type, tag, message) {
  if (process.env.VUE_CLI_API_MODE && message) {
    events.emit('log', {
      message,
      type,
      tag,
    });
  }
}

const format = (label, msg) => {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length);
    })
    .join('\n');
};

const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const logMessage = (msg = '', tag?) => {
  // eslint-disable-next-line
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
  log('log', tag, msg);
};

export const info = (msg, tag?) => {
  console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg));
  log('info', tag, msg);
};

export const done = (msg, tag?) => {
  console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg));
  log('done', tag, msg);
};

export const warn = (msg, tag?) => {
  console.warn(
    format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)),
  );
  log('warn', tag, msg);
};

export const error = (msg, tag?) => {
  console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)));
  log('error', tag, msg);
  if (msg instanceof Error) {
    console.error(msg.stack);
    log('error', tag, msg.stack || '');
  }
};

export const clearConsole = (title?) => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
