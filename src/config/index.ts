/**
 * For each environment we have different configuration, e.g. for console commands we can use cli.env, for testing test.env.
 * All of these files are resolved as environment variables via 'node-env-file' package which loads the content of files
 * into environment variables. All it takes is NODE_ENV environment variable to resolve the file and load entire config.
 * E.g. NODE_ENV=test ./node_modules/.bin/mocha ./src/tests/index.test.js loads test.env file config. We also have a helper method
 * env which tries to load an environment variable based on key, and provides a default value if the variable doesn't exist. E.g
 * env('JWT_EXPIRE_TIME', 3600) tries to load environment variable process.env.JWT_EXPIRE_TIME and provides a default value 3600
 * if it misses.
 */

import * as path from 'path'
import env from '@helpers/EnvHelper'
import envFile = require('node-env-file');

try {
  envFile(path.join(__dirname, '../../.env'))
} catch (e) {
  console.log('No config file found')
}

const APP_ENV = env('APP_ENV', 'development')
const HOST = env('HOST', '0.0.0.0')

const config = {
  // ENV
  APP_NAME: env('APP_NAME', 'Node JS'),
  APP_ENV: APP_ENV,
  PORT: parseInt(env('PORT', '4001')),
  HOST: HOST,
  ROOT: `${__dirname}/..`,

  // REQUEST
  REQ_PAYLOAD_LIMIT: env('REQ_PAYLOAD_LIMIT', '50mb'),

  // DB
  DB_CONNECTION_STRING: `mongodb://${env('DB_HOST', '127.0.0.1')}:${env('DB_PORT', '27017')}/${env('DB_DATABASE', 'admin')}`,


  // SECURITY
  JWT_SECRET: env('JWT_SECRET', 'notsosecure'),
  JWT_EXPIRE_TIME: parseInt(env('JWT_EXPIRE_TIME', '3600')), //seconds
}

export default config
