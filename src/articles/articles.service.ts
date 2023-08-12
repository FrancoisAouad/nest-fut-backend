/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Model, Types, PipelineStage } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDto } from './articles.dto';
import { Article, ArticleDocument } from './articles.schema';
import { SearchDto } from '../global/global.dto';
import { GlobalService } from '../global/global.service';

@Injectable()
export class ArticleService {
  /**
   * @constructor - Constructs a new instance of the ClientService class.
   * @param {Model<ClientDocument>} articleModel - The injected model for interacting with the clients collection.
   * @param {GlobalService} globalService - The global service instance for using utility methods
   */
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>, private globalService: GlobalService) {}

  /**
   * @function create - Creates a new client
   * @param {ClientDto} clientDto
   */
  async create(articleDto: ArticleDto) {
    await this.globalService.isUnique(this.articleModel, 'name', articleDto.name);
    const doc = new this.articleModel(articleDto);
    return doc.save();
  }

  /**
   * @function changePublishStatus - Changes publish status of the client
   * @param {Types.ObjectId[]} ids
   * @param {boolean} status
   */
  async changePublishStatus(ids: Types.ObjectId[], status: boolean) {
    await this.articleModel.updateMany({ _id: { $in: ids } }, { $set: { published: status } });
    return { success: true };
  }

  /**
   * @function update - Updates an existing client
   * @param {Types.ObjectId} _id
   * @param {ClientDto} clientDto
   */
  async update(_id: Types.ObjectId, articleDto: ArticleDto) {
    await this.globalService.isUnique(this.articleModel, 'name', articleDto.name, _id);
    await this.articleModel.updateOne({ _id }, { $set: articleDto });
    return { success: true };
  }

  /**
   * @function removeMany - Removes selected list of clients
   * @param {Types.ObjectId[]} ids
   */
  async removeMany(ids: Types.ObjectId[]) {
    await this.articleModel.deleteMany({ _id: { $in: ids } });
  }

  /**
   * @function removeOne - Removes a single client by their id
   * @param {Types.ObjectId} _id
   */
  async removeOne(_id: Types.ObjectId) {
    await this.articleModel.deleteOne({ _id });
  }

  /**
   * @function findMany - Returns paginated list of all clients
   * @param {DataViewParameters & SearchDto} query
   * @param {string} language
   */
  async findMany(query: SearchDto, language = 'en') {
    const { search } = query;
    const aggregation: PipelineStage[] = [
      {
        $project: {
          name: 1,
          description: `$description.${language}`,
          status: {
            $cond: {
              if: { $eq: ['$published', true] },
              then: 'Published',
              else: 'Unpublished',
            },
          },
          createdAt: 1,
        },
      },
    ];
  }

  /**
   * @function findById - Returns data of a single client
   * @param {Types.ObjectId} _id
   * @error - Client not found
   */
  async findById(_id: Types.ObjectId) {
    const aggregation = [
      { $match: { _id: new Types.ObjectId(_id) } },
      {
        $project: {
          name: 1,
          description: 1,
          published: 1,
        },
      },
    ];
    const res = await this.articleModel.aggregate(aggregation);
    if (res?.length) {
      return res[0];
    }
  }

  /**
   * @function getClientList - Returns a list of label values of published projects
   */
  async getClientList() {
    return await this.articleModel.aggregate([{ $match: { published: true } }, { $project: { label: '$name', value: '$_id', _id: 0 } }]);
  }
}
