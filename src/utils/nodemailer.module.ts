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
import { GlobalService } from '../global/global.service';
import { Logger } from '../global/logger/logger';
import { MailService } from './nodemailer.service';

/**
 * @module MailModule - Module for managing mail
 */
@Module({
  providers: [GlobalService, Logger, MailService],
})
export class MailModule {}
