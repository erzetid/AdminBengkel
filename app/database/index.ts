// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ICustomer} from '../model/Customer';
import {INote} from '../model/Note';
import {IVehicle} from '../model/Vehicle';
import {PartDetail} from '../screens/interface';
import Database from './DBHelper';

const parts = new Database<PartDetail>('parts');
const vehicles = new Database<IVehicle>('vehicle');
const customers = new Database<ICustomer>('customer');
const notes = new Database<INote>('note');

const LocalDB = {
  parts,
  vehicles,
  customers,
  notes,
};
export default LocalDB;
