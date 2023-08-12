/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ArticleMediaType } from '../config/enums';
import { ArticleMedia } from './articles.types';

@Schema({ timestamps: true })
export class Article {
  @Prop({ type: Boolean, default: true })
  published?: boolean;

  @Prop({ type: String, unique: true, maxlength: 50, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: [{ type: MongooseSchema.ObjectId, ref: 'ArticleTag' }] })
  tags?: Types.ObjectId[];

  @Prop({ type: MongooseSchema.ObjectId, ref: 'ArticleCategory', required: true })
  category: Types.ObjectId;

  @Prop({ type: [{ type: String, enum: Object.values(ArticleMediaType), metadata: String, order: Number }] })
  media: ArticleMedia[];

  @Prop({ type: MongooseSchema.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  likes: number;
}

export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);
