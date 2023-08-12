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
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: String })
  favoriteTeam: object[];

  @Prop({ type: String, default: 'http://firebase.s3/profiles/default.png' })
  profileImage?: string;

  @Prop({ type: String })
  biography: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId }])
  leaguesFollowing: Types.ObjectId[];
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
