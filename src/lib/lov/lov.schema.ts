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
import { Document } from 'mongoose';
import { LovType } from '../../config/enums';

@Schema({ timestamps: true })
export class Lov {
  @Prop({ type: String, enum: Object.values(LovType) })
  type: string;

  @Prop({ type: Number })
  sortOrder: number;

  @Prop({ type: String, unique: true })
  code: string;

  @Prop({ type: String })
  value: string;

  @Prop({ type: Boolean })
  active: boolean;
}

export type LovDocument = Lov & Document;
export const LovSchema = SchemaFactory.createForClass(Lov);
