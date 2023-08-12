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
import { Profile, Strategy } from 'passport-facebook';
import config from '../../../config/config';
import { FacebookStrategyProfileField, AuthenticationStrategy, FacebookStrategyScope } from '../../../config/enums';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, AuthenticationStrategy.FACEBOOK) {
  constructor() {
    super({
      clientID: config().oauth.facebook.clientId,
      clientSecret: config().oauth.facebook.clientSecret,
      callbackURL: config().oauth.facebook.callbackUrl,
      scope: FacebookStrategyScope.EMAIL,
      profileFields: Object.values(FacebookStrategyProfileField),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = { user, accessToken };

    done(null, payload);
  }
}
