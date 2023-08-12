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

@Injectable()
export class OAuthService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  //   async registerByIDtoken(payload: any) {
  //     if(payload.hasOwnProperty('id_token')){
  //       let email, firstName, lastName = '';

  //       //You can decode the id_token which returned from Apple,
  //       const decodedObj = await this.jwtService.decode(payload.id_token);
  //       const accountId = decodedObj.sub || '';
  //       console.info(`Apple Account ID: ${accountId}`);

  //       //Email address
  //       if (decodedObj.hasOwnProperty('email')) {
  //         email = decodedObj['email'];
  //         console.info(`Apple Email: ${email.}`);
  //       }

  //       //You can also extract the firstName and lastName from the user, but they are only shown in the first time.
  //       if (payload.hasOwnProperty('user')) {
  //         const userData = JSON.parse(payload.user);
  //         const { firstName, lastName } = userData.name || {};
  //       }

  //       //.... you logic for registration and login here

  //     }
  //     throw new Error('Unauthorized');
  // }
}
