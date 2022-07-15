// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {IProduct} from '../components/serv/Products';
import {TransactionStatus, TransactionType} from '../constant/enum';
import {ICustomer} from './Customer';

export interface ITransactionBuffer {
  no: string;
  type: TransactionType;
  customer: ICustomer;
  discount: number;
  tax: number;
  products: IProduct;
  time: number;
  status: TransactionStatus;
}

export interface ITransaction extends ITransactionBuffer {
  totalServ: number;
  totalPart: number;
  amount: number;
  amountDiscount: number;
  amountTax: number;
  finalAmount: number;
}

export class Transaction {
  constructor(private readonly transaction: ITransactionBuffer) {}
  private calculatePart(): number {
    return this.transaction.products.p.reduce((a, b) => a + b.price, 0);
  }
  private calculateServ(): number {
    return this.transaction.products.s.reduce((a, b) => a + b.price, 0);
  }
  private calculateDiscount(): number {
    const total = this.calculatePart() + this.calculateServ();
    return (total * this.transaction.tax) / 100;
  }

  public toJSON(): ITransaction {
    const totalServ = this.calculateServ();
    const totalPart = this.calculatePart();
    const amount = totalServ + totalPart;
    const amountDiscount = this.calculateDiscount();
    const amountTax = 0;
    const finalAmount = amount - amountDiscount;

    return {
      ...this.transaction,
      totalServ,
      totalPart,
      amount,
      amountDiscount,
      amountTax,
      finalAmount,
    };
  }
}
