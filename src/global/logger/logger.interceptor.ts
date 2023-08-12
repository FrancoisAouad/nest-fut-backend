/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger } from './logger';
import { LogMessageOptions } from '../global.types';
import { HttpException } from '../exceptions/exception';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    const body = req.body;
    const userAgent = req.headers['user-agent'];
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const logMessage = this.handleLogMessage({ responseTime, body });
        this.logger.info(logMessage, { origin: 'interceptor', controller: controllerName, method, url, api: handlerName });
      }),
      catchError((error: HttpException): any => {
        const responseTime = Date.now() - now;
        const logMessage = this.handleLogMessage({ responseTime, body, error });
        this.logger.error(logMessage, { origin: 'interceptor', controller: controllerName, method, url, api: handlerName }, { err: error });
      }),
    );
  }
  handleLogMessage = ({ responseTime, body, error }: LogMessageOptions) => {
    const isError = Boolean(error);
    let logMessage = isError
      ? `Error occurred while processing request. Threw an exception after ${responseTime}ms.`
      : `Executed response within ${responseTime}ms.`;
    if (body && Object.keys(body).length > 0) {
      logMessage += ` Request body: ${JSON.stringify(body)}`;
    }
    return logMessage;
  };
}
