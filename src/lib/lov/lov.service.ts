/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lov, LovDocument } from './lov.schema';

@Injectable()
export class LovService {
  constructor(@InjectModel(Lov.name) private lovModel: Model<LovDocument>) {}

  async getLov(type: string, query: { sort: number }) {
    const sortOrder: number = Number(query.sort) ? query.sort : 1;
    const aggregation: any[] = [
      { $match: { active: true, type: type } },
      { $sort: { sortOrder: Number(sortOrder) } },
      { $project: { label: '$code', value: '$value', _id: 0 } },
    ];
    return await this.lovModel.aggregate(aggregation);
  }

  async getLovData() {
    let res = await this.lovModel.aggregate([
      {
        $project: {
          sortOrder: 1,
          value: 1,
          code: 1,
          type: 1,
          status: {
            $cond: {
              if: { $eq: ['$active', true] },
              then: 'Active',
              else: 'Inactive',
            },
          },
        },
      },
    ]);
    return res;
  }
}
