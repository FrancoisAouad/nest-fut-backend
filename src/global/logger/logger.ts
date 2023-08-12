/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { createLogger, transports, LoggerOptions, format } from 'winston';
import { Injectable } from '@nestjs/common';
import config from '../../config/config';

@Injectable()
export class Logger {
  private options: LoggerOptions = {
    format: Logger.getFormat(),
    transports: Logger.createTransport(),
  };

  info = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    createLogger(this.options).info(message, { label: labels, ...meta });
  };

  error = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    createLogger(this.options).error(message, { label: labels, ...meta });
  };

  warn = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    createLogger(this.options).warn(message, { label: labels, ...meta });
  };

  debug = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    createLogger(this.options).debug(message, { label: labels, ...meta });
  };

  private static createTransport(labels?: any) {
    const customTransports = [];

    if (config().application_logging.file) {
      customTransports.push(
        new transports.File({ filename: config().application_logging.file, level: config().application_logging.level, ...labels }),
      );
    }

    if (config().application_logging.console) {
      customTransports.push(new transports.Console({ level: config().application_logging.level, ...labels }));
    }

    return customTransports;
  }

  private static getFormat() {
    const lokiFormat = format.printf(({ level, message, label, ...meta }) => {
      const logEntry = { timestamp: new Date(), level, message, label: { ...label }, ...meta };
      return JSON.stringify(logEntry);
    });
    return lokiFormat;
  }
}
