/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Module } from '@nestjs/common';
import { Logger } from './logger/logger';
import { GlobalService } from './global.service';
import { HttpExceptionFilter } from './exceptions/exceptions-filter';
import { LoggerInterceptor } from './logger/logger.interceptor';

@Module({
  controllers: [],
  providers: [
    { provide: Logger, useClass: HttpExceptionFilter },
    { provide: Logger, useClass: GlobalService },
    { provide: Logger, useClass: LoggerInterceptor },
  ],
  imports: [],
})
export class GlobalModule {}
