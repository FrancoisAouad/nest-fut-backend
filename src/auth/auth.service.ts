/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '../global/exceptions/exception';
import errorMessage from '../articles/articles.errorMessages';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async get() {
    throw new HttpException(errorMessage().notFound);
  }
}
