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
import { Logger } from '../logger/logger';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      //   const { userId, ...restBody } = this.parseToken(token);
      //   req.body = { ...req.body, userId, ...restBody };
    }

    return next.handle();
  }
}
