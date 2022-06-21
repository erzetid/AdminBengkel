// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {PartDetail} from '../screens/interface';
import Database from './DBHelper';

export const parts = new Database<PartDetail>('parts');
