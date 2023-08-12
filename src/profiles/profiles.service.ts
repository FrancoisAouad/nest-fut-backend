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
import { ProfileDto } from './profiles.dto';
import { Profile, ProfileDocument } from './profiles.schema';
import { SearchDto } from '../global/global.dto';
import { GlobalService } from '../global/global.service';
import { HttpException } from '../global/exceptions/exception';
import errorMessage from './profiles.errorMessages';
import { Logger } from '../global/logger/logger';

@Injectable()
export class ProfileService {
  /**
   * @constructor - Constructs a new instance of the ClientService class.
   * @param {Model<ProfileDocument>} profileModel - The injected model for interacting with the clients collection.
   * @param {GlobalService} globalService - The global service instance for using utility methods
   * @param {Logger} logger - Logger instance
   */
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
    private readonly globalService: GlobalService,
    private readonly logger: Logger,
  ) {}

  async addProfile() {}

  async updateProfile() {}

  async addProfileCMS() {}

  async updateProfileCMS() {}
}
