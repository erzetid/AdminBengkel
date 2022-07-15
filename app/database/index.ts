// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ICustomer} from '../model/Customer';
import {INote} from '../model/Note';
import {IServ, IWorkOrder} from '../model/Serv';
import {IVehicle} from '../model/Vehicle';
import {IWorkshop} from '../model/Workshop';
import {PartDetail} from '../screens/interface';
import Database from './DBHelper';

const parts = new Database<PartDetail>('parts');
const vehicles = new Database<IVehicle>('vehicles');
const customers = new Database<ICustomer>('customers');
const notes = new Database<INote>('notes');
const workOrders = new Database<IWorkOrder>('workorders');
const servs = new Database<IServ>('servs');
const workshops = new Database<IWorkshop>('workshops');
const transactions = new Database<IWorkshop>('transactions');

const LocalDB = {
  parts,
  vehicles,
  customers,
  notes,
  workOrders,
  servs,
  workshops,
  transactions,
};
export default LocalDB;
