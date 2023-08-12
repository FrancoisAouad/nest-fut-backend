/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { SendMailOptions, createTransport, Transporter } from 'nodemailer';
import config from '../config/config';
import { NodemailerService } from '../config/enums';
import { Injectable } from '@nestjs/common';
import { Logger } from '../global/logger/logger';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private readonly logger: Logger) {
    this.transporter = createTransport({
      service: NodemailerService.GMAIL,
      auth: { user: config().nodemailer.user, pass: config().nodemailer.pass },
    });
  }

  sendMail = (mailOptions: SendMailOptions) => {
    this.transporter.sendMail(mailOptions, () => {
      this.logger.debug(`Email sent with the following options: ${JSON.stringify(mailOptions)}`, { origin: 'email' });
    });
  };

  getMailOptionsObject = () => {};
}
