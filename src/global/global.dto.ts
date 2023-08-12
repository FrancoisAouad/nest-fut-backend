/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { IsString, IsOptional, IsArray, IsNotEmpty, IsMongoId, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class ObjectIdDto {
  @IsString()
  @IsMongoId()
  id: Types.ObjectId;
}

export class ObjectIdArray {
  @IsArray()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  ids: Types.ObjectId[];
}

export class SearchDto {
  @IsString()
  @IsOptional()
  search?: string;
}

export class ImageDto {
  @IsNotEmpty({ message: 'Image data is required' })
  @IsString()
  data: string;

  @IsNotEmpty({ message: 'Image extension is required' })
  @IsString()
  ext: string;
}

export class LocalizedString {
  en: string;
  ar: string;
  fr: string;
}

export function LocalizedStringValidator(options: { [key: string]: any }): any {
  class GeneratedLocalizedString {
    @IsString()
    @MaxLength(options.maxLength)
    en: string;

    @IsString()
    @MaxLength(options.maxLength)
    ar: string;

    @IsString()
    @MaxLength(options.maxLength)
    fr: string;
  }

  return GeneratedLocalizedString;
}
