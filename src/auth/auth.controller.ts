/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Controller, Get, UseGuards, Req, Post, Delete, Param, Patch } from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from './users/users.service';
import { OAuthService } from './oauth/oauth.service';
import { Role } from '../config/enums';
import { Roles } from '../global/global.decorators';
import { RoleGuard } from '../global/guards/roles.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly oauthService: OAuthService, private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.oauthService.googleLogin(req);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return { success: true };
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request) {
    return { success: true };
  }

  @Post('register')
  async register() {}

  @Post('login')
  async login() {
    return { success: true, message: 'Welcome to FUT CMS!', accessToken: 'NS9SQBSQW8SQWVS', refreshToken: 'NS7SASBAy82f2182' };
  }

  @Post('forgot-password')
  async forgotPassword() {}

  @Post('reset-password')
  async resetPassword() {}

  @Post('refresh-token')
  async refreshToken() {}

  @Delete('logout')
  async logout() {}

  @Get('verify')
  async verifyAccount() {}

  @Post('cms/login')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async loginCMS() {}

  @Get('cms/users')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async getAllCMSusers() {}

  @Get('cms/users/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async getCMSuserDetails(@Param('id') id: Types.ObjectId) {}

  @Patch('cms/users/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async updateCMSuser(@Param('id') id: Types.ObjectId) {}

  @Post('cms/users')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  async createCMSuser() {}

  @Delete('cms/users/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  async deleteCMSuser(@Param('id') id: Types.ObjectId) {}

  @Patch('cms/users/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  async updateCMSuserPermissions(@Param('id') id: Types.ObjectId) {}

  @Patch('cms/users/:id/deactivate')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  async deactivateCMSuser(@Param('id') id: Types.ObjectId) {}

  @Patch('cms/users/:id/activate')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  async activateCMSuser(@Param('id') id: Types.ObjectId) {}
}
