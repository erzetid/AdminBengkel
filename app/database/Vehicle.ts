// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {Vehicle} from '../model/Vehicle';
import Database from './DBHelper';

export const vehicles = new Database<Vehicle>('vehicle');
