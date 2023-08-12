/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

export default () => {
  const {
    NODE_ENV = 'development',
    APP_PORT = '5021',
    APP_NAME = 'football-app',
    DB_HOST = 'localhost',
    DB_PORT = 27017,
    DB_USER = '',
    DB_PASSWORD = '',
    DB_DATABASE = 'football-app',
    LOG_LEVEL = 'info',
    LOG_ENABLE_CONSOLE = '',
    LOG_FILE = '',
    METRICS_PORT = 8021,
    FACEBOOK_CALLBACK_URL = '',
    FACEBOOK_CLIENT_ID = '',
    FACEBOOK_CLIENT_SECRET = '',
    GOOGLE_CALLBACK_URL = '',
    GOOGLE_CLIENT_ID = '',
    GOOGLE_CLIENT_SECRET = '',
    APPLE_CALLBACK_URL = '',
    APPLE_CLIENT_ID = '',
    APPLE_CLIENT_SECRET = '',
    APPLE_TEAM_ID = '',
    APPLE_KEY_ID = '',
    APPLE_KEY_FILE_PATH = '',
    APPLE_PASS_REQ_CALLBACK = '',
    NODEMAILER_USER = '',
    NODEMAILER_PASS = '',
  } = process.env;

  const isConsoleEnabled = LOG_ENABLE_CONSOLE !== 'true';

  return {
    app: {
      nodeEnv: NODE_ENV,
      port: APP_PORT,
      name: APP_NAME,
    },
    mongo: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    },
    application_logging: {
      level: LOG_LEVEL,
      console: isConsoleEnabled,
      file: LOG_FILE,
    },
    prometheus: {
      port: METRICS_PORT,
    },
    oauth: {
      facebook: {
        callbackUrl: FACEBOOK_CALLBACK_URL,
        clientId: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
      },
      google: {
        callbackUrl: GOOGLE_CALLBACK_URL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      },
      apple: {
        callbackUrl: APPLE_CALLBACK_URL,
        clientId: APPLE_CLIENT_ID,
        clientSecret: APPLE_CLIENT_SECRET,
        teamId: APPLE_TEAM_ID,
        keyId: APPLE_KEY_ID,
        keyFilePath: APPLE_KEY_FILE_PATH,
        passReqToCallback: Boolean(APPLE_PASS_REQ_CALLBACK),
      },
    },
    nodemailer: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  };
};
