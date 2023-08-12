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
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from './users/users.service';
import { OAuthService } from './oauth/oauth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [OAuthService, UserService, AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sanakxnaskxnaxkas',
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class AuthModule {}
