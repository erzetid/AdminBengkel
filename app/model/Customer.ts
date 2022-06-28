// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface ICustomer {
  name: string;
  phone: string;
  address: string;
}

export class Customer {
  private name: string;
  private phone = '';
  private address = '';

  constructor(name: string) {
    this.name = name;
  }

  setPhone(phone: string): Customer {
    this.phone = phone;
    return this;
  }

  setAddress(address: string): Customer {
    this.address = address;
    return this;
  }
  getName(): string {
    return this.name;
  }
  getPhone(): string {
    return this.phone;
  }
  getAddress(): string {
    return this.address;
  }

  toJSON(): ICustomer {
    return {name: this.name, phone: this.phone, address: this.address};
  }
}
