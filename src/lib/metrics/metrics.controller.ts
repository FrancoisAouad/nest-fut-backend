/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { MetricService } from './metrics.service';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  /**
   * @Api - Generate Metrics
   * @method GET
   */
  @Get()
  generateMetrics() {
    return this.metricService.generateMetrics();
  }
}
