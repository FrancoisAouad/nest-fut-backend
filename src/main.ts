/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import config from './config/config';
import { AppModule } from './app.module';
import { Logger } from './global/logger/logger';
import { initPrometheus, initSwagger, initMiddleware } from './main-utils';
import { HttpExceptionFilter } from './global/exceptions/exceptions-filter';

export const bootstrap = async () => {
  /* Application setup */
  const appOptions: NestApplicationOptions = { cors: true, logger: false };
  const app = await NestFactory.create(AppModule, appOptions);
  const logger = app.get(Logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  /* Initialize Prometheus server */
  initPrometheus(logger);

  /* Initialize Middleware */
  initMiddleware(app);

  /* Initialize Swagger docs */
  if (config().app.nodeEnv.toLowerCase() === 'development') {
    initSwagger(app, logger);
  }

  /* Start Application */
  await app.listen(config().app.port, () => {
    logger.info(`Application Listening on Port: ${config().app.port}`, { origin: 'system' });
  });
};

bootstrap();
