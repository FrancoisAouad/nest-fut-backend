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
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
