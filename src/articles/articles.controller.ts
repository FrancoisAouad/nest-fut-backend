/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Headers, UseGuards } from '@nestjs/common';
import { ArticleDto } from './articles.dto';
import { ArticleService } from './articles.service';
import { ObjectIdDto, SearchDto, ObjectIdArray } from '../global/global.dto';
import { LoggerInterceptor } from '../global/logger/logger.interceptor';
import { AuthenticationGuard } from '../global/guards/auth.guard';

@ApiTags('Articles')
@Controller('articles')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticationGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * @Api - Creates a new article
   * @method POST
   * @param {ArticleDto} articleDto - The request body of the client
   * @returns {Promise<ClientDocument>}
   */
  @Post()
  create(@Body() articleDto: ArticleDto) {
    return this.articleService.create(articleDto);
  }

  /**
   * @Api - Returns list of label values
   * @method GET
   * @returns {Promise<any[]>}
   */
  @Get('list')
  getClientList() {
    return this.articleService.getClientList();
  }

  /**
   * @Api - Publishes a list of client
   * @method PATCH
   * @param {ObjectIdArray} body - Array of client ids
   * @returns {Promise<{success: true}>}
   */
  @Patch('publish')
  publish(@Body() body: ObjectIdArray) {
    return this.articleService.changePublishStatus(body.ids, true);
  }

  /**
   * @Api - Un-publishes a list of articles
   * @method PATCH
   * @param {ObjectIdArray} body - Array of client ids
   * @returns {Promise<{success: true}>}
   */
  @Patch('unpublish')
  unpublish(@Body() body: ObjectIdArray) {
    return this.articleService.changePublishStatus(body.ids, false);
  }

  /**
   * @Api - Returns paginated list of data
   * @method GET
   * @param {DataViewParameters & SearchDto} query - The request body of the client
   * @param {string} language - Header language to be sent in the request
   * @Interceptors - Pagination interceptor for paginating data
   * @returns {Promise<object>}
   */
  @Get()
  findMany(@Query() query: SearchDto, @Headers('accept-language') language: string) {
    return this.articleService.findMany(query, language);
  }

  /**
   * @Api - Return data of a single article
   * @method GET
   * @param {ObjectIdDto} params - Id of the client
   * @returns {Promise<any>}
   */
  @Get(':id')
  findById(@Param() params: ObjectIdDto) {
    return this.articleService.findById(params.id);
  }

  /**
   * @Api - Updates a article
   * @method PATCH
   * @param {ArticleDto} articleDto - Request Body of the client
   * @param {ObjectIdDto} params - Id of the user
   * @returns {Promise<{success: true}>}
   */
  @Patch(':id')
  update(@Param() params: ObjectIdDto, @Body() articleDto: ArticleDto) {
    return this.articleService.update(params.id, articleDto);
  }

  /**
   * @Api - Deletes a list of articles
   * @method DELETE
   * @param {ClientDto} body - The list of ids of the clients
   * @returns {Promise<void>}
   */
  @Delete()
  removeMany(@Body() body: ObjectIdArray) {
    return this.articleService.removeMany(body.ids);
  }

  /**
   * @Api - Remove a single article by their id
   * @method DELETE
   * @param {ObjectIdDto} params - The id of the client
   * @returns {Promise<ClientDocument>}
   */
  @Delete(':id')
  removeOne(@Param() params: ObjectIdDto) {
    return this.articleService.removeOne(params.id);
  }
}
