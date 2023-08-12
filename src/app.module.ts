/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
import { Logger } from './global/logger/logger';
import { ProfileModule } from './profiles/profiles.module';
import { ArticleModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { LovModule } from './lib/lov/lov.module';

@Module({
  controllers: [],
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      load: [config],
      ...(config().app.nodeEnv.toLowerCase() === 'integration' ? { envFilePath: join(process.cwd(), `.env.integration`) } : {}),
    }),
    MongooseModule.forRoot(
      `mongodb://${config().mongo.user && config().mongo.password ? `${config().mongo.user}:${config().mongo.password}@` : ''}${
        config().mongo.host
      }:${config().mongo.port}/${config().mongo.database}?authSource=admin`,
      {
        retryDelay: 5000,
        retryAttempts: 2,
      },
    ),
    ArticleModule,
    AuthModule,
    LovModule,
    ProfileModule,
  ],
})
export class AppModule {}
