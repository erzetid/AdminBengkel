// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ResultStatus} from '../enum';

export default abstract class Result<T> {
  readonly status: ResultStatus;
  readonly message: string;
  readonly data: T | null;
  constructor(status: ResultStatus, message: string, data: T | null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
