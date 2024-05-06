import dotenv, { type DotenvConfigOutput } from 'dotenv';

const envConfig: DotenvConfigOutput = dotenv.config({
  path: './src/task9/.env',
});

if (envConfig.error || !envConfig.parsed) {
  throw envConfig.error;
}

export default envConfig.parsed || {};
