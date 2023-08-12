/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

class GenericObject {
  // Define properties and methods of the complex object here
  constructor(public name: string) {}
}

export class ObjectBuilder {
  private name: string = '';

  // Set the name property
  setName(name: string): this {
    this.name = name;
    return this;
  }

  // Build the final complex object
  build(): GenericObject {
    return new GenericObject(this.name);
  }
}
