import EventEmitter from 'events';
import readline from 'readline';

import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

interface LogEvent {
  message: string;
  type: string;
  tag: string | null;
}

export const events = new EventEmitter();

function log(type: string, tag: string | null, message: string): void {
  if (process.env.VUE_CLI_API_MODE && message) {
    events.emit('log', {
      message,
      type,
      tag,
    } as LogEvent);
  }
}

const format = (label: string, msg: string): string => {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length);
    })
    .join('\n');
};

const chalkTag = (msg: string): string => chalk.bgBlackBright.white.dim(` ${msg} `);

export const logMessage = (msg = '', tag: string | null = null): void => {
  // eslint-disable-next-line
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
  log('log', tag, msg);
};

export const info = (msg: string, tag: string | null = null): void => {
  console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg));
  log('info', tag, msg);
};

export const done = (msg: string, tag: string | null = null): void => {
  console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg));
  log('done', tag, msg);
};

export const warn = (msg: string, tag: string | null = null): void => {
  console.warn(
    format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)),
  );
  log('warn', tag, msg);
};

export const error = (msg: string | Error, tag: string | null = null): void => {
  console.error(
    format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg as string)),
  );
  log('error', tag, msg as string);
  if (msg instanceof Error) {
    console.error(msg.stack);
    log('error', tag, msg.stack || '');
  }
};

export const clearConsole = (title?: string): void => {
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
