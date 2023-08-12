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
import { PassportStrategy } from '@nestjs/passport';
// to delete due to vulnerability
import { Strategy } from '@arendajaelu/nestjs-passport-apple';
import { AppleStrategyScope, AuthenticationStrategy } from '../../../config/enums';
import config from '../../../config/config';
@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, AuthenticationStrategy.APPLE) {
  constructor() {
    super({
      clientID: config().oauth.apple.clientId,
      teamID: config().oauth.apple.teamId,
      keyID: config().oauth.apple.keyId,
      keyFilePath: config().oauth.apple.keyFilePath,
      callbackURL: config().oauth.apple.callbackUrl,
      passReqToCallback: config().oauth.apple.passReqToCallback,
      scope: Object.values(AppleStrategyScope),
    });
  }
}
