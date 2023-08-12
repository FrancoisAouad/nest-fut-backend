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
import { LoginType, Role } from '../../config/enums';
import { DeviceDetails } from './users.types';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true, maxlength: 50 })
  name: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, enum: Object.values(Role), default: Role.USER })
  role: string;

  @Prop({ type: String, enum: Object.values(LoginType) })
  loginType: string[];

  @Prop({ type: String })
  image: string;

  @Prop({ type: String, unique: true })
  phone: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  dateOfBirth: string;

  @Prop({
    type: [
      {
        deviceId: String,
        modelNumber: String,
        platform: String,
        appVersion: String,
      },
    ],
  })
  deviceDetails: DeviceDetails[];

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: Boolean, default: false })
  termsAndConditions?: boolean;

  @Prop({ type: Boolean, default: false })
  locked?: boolean;

  @Prop({ type: Number, default: 0 })
  passwordAttempts?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  profile?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isGuest: boolean;

  @Prop({ type: String, unique: true })
  googleEmail: string;

  @Prop({ type: String })
  googlePassword: string;

  @Prop({ type: String, unique: true })
  facebookEmail: string;

  @Prop({ type: String })
  facebookPassword: string;

  @Prop({ type: String, unique: true })
  appleEmail: string;

  @Prop({ type: String })
  applePassword: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: Boolean, default: false })
  active?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
