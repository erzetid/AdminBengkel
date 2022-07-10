// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {IVehicle} from './Vehicle';

export interface ICustomer {
  id?: string;
  no: string;
  name: string;
  phone: string;
  address: string;
  vehicle?: IVehicle[];
  time?: number;
}

export class Customer {
  private name: string;
  private no = '';
  private phone = '';
  private address = '';
  private vehicle: IVehicle[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setNo(no: string): Customer {
    this.no = no;
    return this;
  }

  setPhone(phone: string): Customer {
    this.phone = phone;
    return this;
  }

  setAddress(address: string): Customer {
    this.address = address;
    return this;
  }

  addVehicle(vehicle: IVehicle | IVehicle[]): Customer {
    if (Array.isArray(vehicle)) {
      this.vehicle.push(...vehicle);
    } else {
      this.vehicle.push(vehicle);
    }
    return this;
  }

  toJSON(): ICustomer {
    return {
      no: this.no,
      name: this.name,
      phone: this.phone,
      address: this.address,
      vehicle: this.vehicle,
    };
  }
}
