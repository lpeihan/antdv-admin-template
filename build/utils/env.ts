import fs from 'fs';

import dotenv from 'dotenv';

import { resolve } from './paths';

export function getEnvVars(env) {
  const envFiles = ['.env.lab'];
  envFiles.push(`.env.${env}`);

  const envVars = {};

  envFiles.forEach((file) => {
    const fullPath = resolve(file);
    if (fs.existsSync(fullPath)) {
      const result = dotenv.parse(fs.readFileSync(fullPath));
      Object.assign(envVars, result);
    }
  });

  return envVars;
}
