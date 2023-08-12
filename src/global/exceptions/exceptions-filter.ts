/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Request, Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { status, message } = HttpExceptionFilter.handleExceptionType(exception, request);
    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }

  private static handleExceptionType(exception: HttpException | Error, request: Request) {
    let status: number;
    let message: string[];
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorMessage: any = exception.getResponse();
      message = Array.isArray(errorMessage.message) ? errorMessage.message : [errorMessage.message].filter(Boolean);
    } else if (exception instanceof Error) {
      status = 400;
      message = [exception.message];
    }
    return { status, message };
  }
}
