/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Exception, Message } from '../global.types';

export class HttpException extends Error {
  private status: number;
  private errorCode: string;
  private errorMessage: Message;

  constructor(params: Exception) {
    super();

    this.status = params.status;
    this.errorCode = params.errorCode;
    this.errorMessage = params.errorMessage;
  }
}
