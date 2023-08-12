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
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './articles.service';
import { ArticleController } from './articles.controller';
import { Article, ArticleSchema } from './articles.schema';
import { GlobalService } from '../global/global.service';
import { Logger } from '../global/logger/logger';
import { JwtService } from '@nestjs/jwt';

/**
 * @module ArticleModule - Module for managing clients
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [ArticleController],
  providers: [ArticleService, Article, GlobalService, Logger, JwtService],
})
export class ArticleModule {}
