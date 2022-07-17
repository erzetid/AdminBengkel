// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ICashes} from '../model/CashFlow';
import {ICustomer} from '../model/Customer';
import {INote} from '../model/Note';
import {IServ, IWorkOrder} from '../model/Serv';
import {ITransaction} from '../model/Transaction';
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
const transactions = new Database<ITransaction>('transactions');
const cashes = new Database<ICashes>('cashes');

const LocalDB = {
  parts,
  vehicles,
  customers,
  notes,
  workOrders,
  servs,
  workshops,
  transactions,
  cashes,
};
export default LocalDB;
