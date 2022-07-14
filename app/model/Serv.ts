// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {CategoryServ, ServStatus} from '../constant/enum';
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

export const emptyServ: IServ = {
  name: '',
  code: '',
  price: 0,
  processTime: 0,
  description: '',
  category: CategoryServ.REGULAR,
  time: 0,
};

export interface IWorkOrder {
  id?: string;
  queue: string;
  time: number;
  vehicle: IVehicle;
  customer: ICustomer;
  kilometer: number;
  serv: IServ[];
  part: PartDetail[];
  complaint: string;
  analysis: string;
  mechanic: string;
  startTime: number;
  doneTime: number;
  status: ServStatus;
}
