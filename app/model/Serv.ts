// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {CategoryServ} from '../constant/enum';
import {PartDetail} from '../screens/interface';
import {ICustomer} from './Customer';
import {IVehicle} from './Vehicle';

export interface IServ {
  id?: string;
  name: string;
  code: string;
  price: number;
  processTime: number;
  description: string;
  category: CategoryServ;
  time?: number;
}

export interface IWorkOrder {
  id?: string;
  queue: string;
  time: number;
  vehicle: IVehicle;
  customer: ICustomer;
  serv: IServ[];
  part: PartDetail[];
  complaint: string;
  analysis: string;
  mechanic: string;
  startTime: number;
  doneTime: number;
}
