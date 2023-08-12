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
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../config/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('role', [context.getHandler(), context.getClass()]);
    // check if user role is included in the roles guard. return role with user id in req headers
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
