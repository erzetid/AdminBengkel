// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ResultStatus} from '../enum';
import Result from './Result';

export class NotFoundResult<T> extends Result<T> {
  constructor(message: string, data: T | null = null) {
    super(ResultStatus.FAILED, message, data);
  }
}
