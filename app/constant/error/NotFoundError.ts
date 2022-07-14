// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ClientError from './ClientError';

export class NotFoundError extends ClientError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
