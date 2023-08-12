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
import { InjectConnection } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private mongoConnection: Connection) {}
  async getHealth() {
    const state = await this.mongoConnection.readyState;
    if (state === 1) {
      return { statusCode: 200, status: 'up', dateTime: moment() };
    }
    return { statusCode: 500, status: 'down', dateTime: moment() };
  }
}
