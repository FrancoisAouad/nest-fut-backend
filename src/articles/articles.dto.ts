/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsObject, ValidateNested, MaxLength } from 'class-validator';
import { LocalizedString, LocalizedStringValidator } from '../global/global.dto';

export class ArticleDto {
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @MaxLength(50)
  name: string;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => LocalizedStringValidator({ maxLength: 300 }))
  description?: LocalizedString;
}
