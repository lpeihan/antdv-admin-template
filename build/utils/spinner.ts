import chalk from 'chalk';
import ora, { Ora } from 'ora';

interface LastMessage {
  symbol: string;
  text: string;
}

const spinner: Ora = ora();
let lastMsg: LastMessage | null = null;
let isPaused = false;

export const logWithSpinner = (symbol: string, msg?: string): void => {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = ' ' + msg;
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  };
  spinner.start();
};

export const stopSpinner = (persist?: boolean): void => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export const pauseSpinner = (): void => {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
};

export const resumeSpinner = (): void => {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
};

export const failSpinner = (text: string): void => {
  spinner.fail(text);
};
