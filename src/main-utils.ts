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
import helmet from 'helmet';
import { INestApplication, ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './global/exceptions/exceptions-filter';
import { MetricsModule } from './lib/metrics/metrics.module';
import { Logger } from './global/logger/logger';
import config from './config/config';

export const initSwagger = (app: INestApplication, logger: Logger) => {
  const options = new DocumentBuilder().setTitle('Football API API').setDescription('Football App API Documentation').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  logger.info(`Swagger docs running on port: ${config().app.port}`, { origin: 'docs' });
};

export const initPrometheus = async (logger: Logger) => {
  const options: NestApplicationOptions = { logger: false };
  const app = await NestFactory.create(MetricsModule, options);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config().prometheus.port, () => {
    logger.info(`Prometheus metrics server running on Port: ${config().prometheus.port}`, { origin: 'metrics' });
  });
};

export const initMiddleware = (app: INestApplication) => {
  app.use(helmet());
};
