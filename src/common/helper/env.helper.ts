
import { existsSync } from 'fs';
import { resolve } from 'path';

// This function returns the absolute path to our environment file based on our NODE_ENV. 
// It has two fallbacks. First, if NODE_ENV is not set, 
// we try to get the absolute path of the development.env file, 
// if this file does not exist, it will return the absolute path to the .env file.
export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}