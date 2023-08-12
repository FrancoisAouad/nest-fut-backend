/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

export default () => ({
  notFound: {
    status: 404,
    errorCode: 'NOT_FOUND',
    errorMessage: {
      en: 'Failed to find Profile',
      ar: 'فشل العثور على العميل',
      fr: 'Impossible de trouver le client',
    },
  },
});
