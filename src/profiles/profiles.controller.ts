/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UseGuards, Headers } from '@nestjs/common';
import { ProfileDto } from './profiles.dto';
import { ProfileService } from './profiles.service';
import { ObjectIdDto } from '../global/global.dto';
import { LoggerInterceptor } from '../global/logger/logger.interceptor';
import { AuthenticationGuard } from '../global/guards/auth.guard';

@ApiTags('Profile')
@Controller('profiles')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticationGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Add app user profile', description: 'Create new profile for an app user ' })
  @ApiResponse({ status: 201, description: 'Profile has been created' })
  @ApiResponse({ status: 409, description: 'Profile for the user already exists' })
  addProfile(@Body() body: ProfileDto, @Headers('authorization') authorization: string, @Headers('accept-language') language: string): Promise<any> {
    return this.profileService.addProfile();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update app user profile', description: 'Update an app user profile by its Id' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated' })
  updateProfile(
    @Param('id') id: Types.ObjectId,
    @Body() body: ProfileDto,
    @Headers('authorization') authorization: string,
    @Headers('accept-languages') language: string,
  ): Promise<any> {
    return this.profileService.updateProfile();
  }

  @Post('cms')
  @ApiOperation({ summary: 'Add profile to CMS user', description: 'Create new profile for CMS user' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 409, description: 'CMS user profile already exists' })
  addProfileCMS(@Body() body: ProfileDto, @Headers('authorization') authorization: string, @Headers('accept-languages') language: string) {
    return this.profileService.addProfileCMS();
  }

  @Patch('cms/:id')
  @ApiOperation({ summary: 'Update CMS user profile', description: 'Update CMS user profile' })
  @ApiResponse({ status: 200, description: 'Success' })
  updateProfileCMS(
    @Param('id') id: Types.ObjectId,
    @Body() body: ProfileDto,
    @Headers('authorization') authorization: string,
    @Headers('accept-languages') language: string,
  ) {
    return this.profileService.updateProfileCMS();
  }
}
