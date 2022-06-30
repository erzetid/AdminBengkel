// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface IVehicle {
  id?: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  registrationNumber: string;
  owner?: string;
  time?: number;
}

export class Vehicle {
  id?: string;
  brand = '';
  model = '';
  year = 2000;
  plate = '';
  registrationNumber = '';
  owner?: string;
  time = Date.now();

  constructor(data?: {
    id?: string;
    owner?: string;
    brand?: string;
    model?: string;
    plate?: string;
    year?: number;
    registrationNumber?: string;
    time?: number;
  }) {
    this.id = data?.id;
    this.brand = data?.brand || this.brand;
    this.model = data?.model || this.model;
    this.plate = data?.plate || this.plate;
    this.year = data?.year || this.year;
    this.registrationNumber =
      data?.registrationNumber || this.registrationNumber;
    this.time = data?.time || this.time;
  }

  setId(brand: string): Vehicle {
    this.brand = brand;
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
  setTime(time: number): Vehicle {
    this.time = time;
    return this;
  }

  toJSON(): IVehicle {
    return {
      brand: this.brand,
      model: this.model,
      year: this.year,
      plate: this.plate,
      registrationNumber: this.registrationNumber,
    };
  }
}
