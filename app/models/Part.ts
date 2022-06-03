// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Realm} from '@realm/react';
import {Part} from 'admin-bengkel';

export class PartModel extends Realm.Object {
  _id!: Realm.BSON.ObjectId;

  static generate(data: Part) {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
    };
  }

  static schema = {
    name: 'Part',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      id: 'string',
      name: 'string',
      price: 'float',
      quantity: 'float',
      description: 'string',
      image: 'string',
      category: 'string',
      time: 'float',
    },
  };
}
