// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {CashCategory, CashFlowType, TransactionType} from '../constant/enum';
import {ITransaction} from './Transaction';

export const emptyCashes: ICashes = {
  id: '0',
  no: 'OUT-101212',
  type: CashFlowType.OUTCOME,
  category: CashCategory.DIRECT,
  description: '',
  amount: 0,
  time: 0,
};

export interface ICashes {
  id?: string;
  no: string;
  category: CashCategory | TransactionType;
  type: CashFlowType;
  description: string;
  amount: number;
  time: number;
}

export interface ICashFlow extends ICashes {
  detail: ITransaction | ICashes;
}
