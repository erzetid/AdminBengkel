// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface IVehicle {
  brand: string;
  model: string;
  year: number;
  plate: string;
  registrationNumber: string;
  owner?: string;
}

export class Vehicle {
  id?: string;
  brand = '';
  model = '';
  year = 2000;
  plate = '';
  registrationNumber = '';
  owner = '';

  constructor(data?: {
    id?: string;
    owner?: string;
    brand?: string;
    model?: string;
    plate?: string;
    year?: number;
    registrationNumber?: string;
  }) {
    this.id = data?.id;
    this.owner = data?.owner || this.owner;
    this.brand = data?.brand || this.brand;
    this.model = data?.model || this.model;
    this.plate = data?.plate || this.plate;
    this.year = data?.year || this.year;
    this.registrationNumber =
      data?.registrationNumber || this.registrationNumber;
  }

  setId(brand: string): Vehicle {
    this.brand = brand;
    return this;
  }

  setOwner(owner: string): Vehicle {
    this.owner = owner;
    return this;
  }

  setBrand(brand: string): Vehicle {
    this.brand = brand;
    return this;
  }

  setModel(model: string): Vehicle {
    this.model = model;
    return this;
  }

  setYear(year: number): Vehicle {
    this.year = year;
    return this;
  }

  setPlate(plate: string): Vehicle {
    this.plate = plate;
    return this;
  }

  setRegistrationNumber(registrationNumber: string): Vehicle {
    this.registrationNumber = registrationNumber;
    return this;
  }

  toJSON(): IVehicle {
    return {
      owner: this.owner,
      brand: this.brand,
      model: this.model,
      year: this.year,
      plate: this.plate,
      registrationNumber: this.registrationNumber,
    };
  }
}
