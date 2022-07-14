// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface IWorkshop {
  id: string;
  code: string;
  name: string;
  owner: string;
  phone: string;
  address: string;
  description: string;
}

export const emptyWorkshop: IWorkshop = {
  id: '0',
  code: '0',
  owner: 'Bambang',
  name: 'Erzet',
  phone: '0',
  address: 'Brebes',
  description: 'Melayani servis dan ganti oli.',
};
