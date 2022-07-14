// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ICustomer} from '../model/Customer';
import {INote} from '../model/Note';
import {IServ, IWorkOrder} from '../model/Serv';
import {IVehicle} from '../model/Vehicle';
import {PartDetail} from '../screens/interface';
import Database from './DBHelper';

const parts = new Database<PartDetail>('parts');
const vehicles = new Database<IVehicle>('vehicle');
const customers = new Database<ICustomer>('customer');
const notes = new Database<INote>('note');
const workOrders = new Database<IWorkOrder>('workOrder');
const servs = new Database<IServ>('serv');

const LocalDB = {
  parts,
  vehicles,
  customers,
  notes,
  workOrders,
  servs,
};
export default LocalDB;
