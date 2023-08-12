/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthenticationStrategy, GoogleStrategyScope } from '../../../config/enums';
import config from '../../../config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthenticationStrategy.GOOGLE) {
  constructor() {
    super({
      clientID: config().oauth.google.clientId,
      clientSecret: config().oauth.google.clientSecret,
      callbackURL: config().oauth.google.callbackUrl,
      scope: Object.values(GoogleStrategyScope),
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
