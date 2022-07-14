// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import AsyncStorage from '@react-native-async-storage/async-storage';
import easyDB from 'easy-db-react-native';
import {InvariantError} from '../constant/error';
import Result, {
  FailedResult,
  NotFoundResult,
  SuccessResult,
} from '../constant/result';

const {insert, select, update, remove} = easyDB();

export default class Database<T> {
  private readonly data: T[] = [];

  constructor(private readonly collectionName: string) {}

  public async getAll(): Promise<T[]> {
    return await this.deflate();
  }

  public getCollectionName(): string {
    return this.collectionName;
  }

  public async findById(id: string): Promise<Result<T>> {
    const data = (await select(this.collectionName, id)) as T;
    if (data === null) {
      return new NotFoundResult('Data tidak ditemukan.');
    }

    return new SuccessResult('Data berhasil ditemukan.', data);
  }

  public async create(data: T): Promise<Result<T>> {
    const newData = await insert(this.collectionName, data as any);
    if (!newData) {
      throw new InvariantError('Error while creating data');
    }
    const _data = {...data, id: newData};
    return new SuccessResult('Data baru berhasil dibuat.', _data);
  }

  public async update(id: string, data: T): Promise<Result<T>> {
    const check = (await select(this.collectionName, id)) as T;
    if (check === null) {
      return new NotFoundResult('Data tidak ditemukan.');
    }
    await update(this.collectionName, id, {...data, update: 1});
    return new SuccessResult('Data baru berhasil diperbarui.', {...data, id});
  }

  public async delete(id: string): Promise<Result<T>> {
    const check = (await select(this.collectionName, id)) as T;
    if (check === null) {
      return new NotFoundResult('Data tidak ditemukan.');
    }
    await remove(this.collectionName, id);
    return new SuccessResult('Data berhasil dihapus.');
  }

  public async drop(): Promise<Result<T>> {
    await AsyncStorage.removeItem(`@easy-db:${this.collectionName}`, e => {
      if (e) {
        return new FailedResult('Gagal menghapus semua data.');
      }
    });
    return new SuccessResult('Berhasil menghapus semua data.');
  }

  private async deflate() {
    const newArr = [];
    const obj = await select(this.collectionName);
    for (const key in obj) {
      const data = obj[key];
      const newData = {id: key, ...data} as T;
      newArr.push(newData);
    }

    return newArr;
  }
}
