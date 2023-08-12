/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const req = http.getRequest();
    //
    const token = this.extractTokenFromHeader(req);
    // if (!token) {
    // throw new UnauthorizedException();
    // }
    try {
      // const payload = await this.jwtService.verifyAsync(token, {
      // secret: jwtConstants.secret,
      // });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request['user'] = payload;
    } catch {
      // throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    // const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : undefined;
  }
}
