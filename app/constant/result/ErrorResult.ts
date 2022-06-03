// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ResultStatus} from '../enum';
import Result from './Result';

export class ErrorResult<T> extends Result<T> {
  constructor(message: string, data: T | null = null) {
    super(ResultStatus.ERROR, message, data);
  }
}
