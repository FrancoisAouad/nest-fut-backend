/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

/**
 * @enum {string} - Enum representing user roles
 * @typedef {object} Role
 * @property {string} SUPER_ADMIN
 * @property {string} ADMIN
 * @property {string} USER
 */

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * @enum {string} - Enum representing the lov types
 * @typedef {object} LovType
 * @property {string} LANGUAGES
 */
export enum LovType {
  LANGUAGES = 'languages',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} AuthenticationStrategy
 * @property {string} GOOGLE
 * @property {string} APPLE
 * @property {string} FACEBOOK
 * @property {string} EMAIL
 */
export enum AuthenticationStrategy {
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} FacebookStrategyScope
 * @property {string} EMAIL
 */
export enum FacebookStrategyScope {
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} FacebookStrategyProfileFieldF
 * @property {string} EMAILS
 * @property {string} NAME
 */
export enum FacebookStrategyProfileField {
  EMAILS = 'emails',
  NAME = 'name',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} GoogleStrategyScope
 * @property {string} PROFILE
 * @property {string} EMAIL
 */
export enum GoogleStrategyScope {
  EMAIL = 'email',
  PROFILE = 'profile',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} AppleStrategyScope
 * @property {string} NAME
 * @property {string} EMAIL
 */
export enum AppleStrategyScope {
  EMAIL = 'email',
  NAME = 'name',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} NodemailerService
 * @property {string} GMAIL
 */
export enum NodemailerService {
  GMAIL = 'gmail',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} LoginType
 * @property {string} GOOGLE
 * @property {string} APPLE
 * @property {string} FACEBOOK
 * @property {string} EMAIL
 */
export enum LoginType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  EMAIL = 'email',
}

export enum ArticleMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}
