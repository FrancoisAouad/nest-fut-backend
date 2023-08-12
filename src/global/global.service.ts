/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Logger } from './logger/logger';

@Injectable()
export class GlobalService {
  constructor(private readonly logger: Logger) {}
  isUnique = async (model: Model<any>, fieldName: string, fieldValue: string, _id?: Types.ObjectId, extraConditions: { [key: string]: any } = {}) => {
    let match: any = {};
    if (_id) {
      match._id = { $ne: _id };
    }
    if (fieldName) {
      match[fieldName] = { $regex: '^' + fieldValue + '$', $options: 'i' };
    }

    match = { ...match, ...extraConditions };
    const exists = await model.findOne(match);
    if (exists) {
      throw new Error();
    }
  };

  generateBasicAuth = (username: string, password: string) => {
    return 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
  };
}
