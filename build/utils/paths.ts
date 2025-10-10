import path from 'path';

// gen static file path
export const getAssetPath = (...args: string[]): string => path.posix.join('static', ...args);

// gen absolute path
export const resolve = (...args: string[]): string => path.posix.join(process.cwd(), ...args);
