// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {TransactionType} from '../../constant/enum';
import {color} from '../../constant/theme';
import LocalDB from '../../database';
import {ITransaction} from '../../model/Transaction';
import {emptyWorkshop} from '../../model/Workshop';
import Form from '../form/Form';

interface TransactionDetailProps {
  visible: boolean;
  data?: ITransaction;
  onClose: () => void;
}

const TransactionDetail: FC<TransactionDetailProps> = ({
  visible,
  data,
  onClose,
}) => {
  const workshopsCollection = useMemo(() => LocalDB.workshops, []);
  const [workshop, setWorkshop] = useState(emptyWorkshop);

  useEffect(() => {
    const init = async () => {
      const ws = await workshopsCollection.getAll();
      ws.length && setWorkshop(ws[0]);
    };
    init();
  }, [workshopsCollection]);

  const servMemo = useMemo(
    () => (
      <View style={styles.productContent}>
        <View style={styles.subProductContent}>
          <Text style={styles.textProduct}>BIAYA JASA</Text>
          {data &&
            data.products.s.map((s, i) => (
              <View key={i}>
                <View style={styles.detailContent}>
                  <Text style={styles.textProductTitle}>{s.name}</Text>
                  <Text style={styles.textProductPrice}>
                    {formatNumber(s.price, {
                      prefix: 'Rp',
                      delimiter: ',',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                </View>
              </View>
            ))}
          <View style={styles.textTotalContent}>
            <Text style={styles.textProductTitle}>Total Jasa</Text>
            <Text style={styles.textAmount}>
              {formatNumber(data?.totalServ || 0, {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              })}
            </Text>
          </View>
        </View>
      </View>
    ),
    [data],
  );

  const partMemo = useMemo(
    () => (
      <View style={styles.productContent}>
        <View style={styles.subProductContent}>
          <Text style={styles.textProduct}>BIAYA SPAREPART</Text>
          {data &&
            data.products.p.map((s, i) => (
              <View key={i}>
                <View style={styles.detailContent}>
                  <Text style={styles.textProductTitle}>{s.name}</Text>
                  <Text style={styles.textProductPrice}>
                    {formatNumber(s.price, {
                      prefix: 'Rp',
                      delimiter: ',',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                </View>
              </View>
            ))}
          <View style={styles.textTotalContent}>
            <Text style={styles.textProductTitle}>Total Sparepart</Text>
            <Text style={styles.textAmount}>
              {formatNumber(data?.totalPart || 0, {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              })}
            </Text>
          </View>
        </View>
      </View>
    ),
    [data],
  );

  return (
    <Form visible={visible} iosIcon="wallet" title="Preview" onClose={onClose}>
      <View>
        <View style={styles.header}>
          <Text style={styles.textName}>{workshop.name}</Text>
          {/* <Text style={styles.textNormal}>Kode Bengkel: {workshop.code}</Text> */}
          <Text style={styles.textAddress}>{workshop.address}</Text>
          <Text style={styles.textNormal}>+62{workshop.phone}</Text>
          <Text style={styles.textNormal}>{workshop.description}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.textTitle}>Tanggal</Text>
          <Text style={styles.textValue}>
            :{' '}
            {data &&
              formatDate(data.time || 0, 'dd LLLL yyyy HH:mm', {
                locale: id,
              })}
          </Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.textTitle}>No Transaksi</Text>
          <Text style={styles.textValue}>: {data && data.no}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.textTitle}>Nama</Text>
          <Text style={styles.textValue}>: {data && data.customer.name}</Text>
        </View>
        {data?.type === TransactionType.SERVICE &&
          data.customer.vehicle?.length && (
            <>
              <View style={styles.detailContent}>
                <Text style={styles.textTitle}>No Polisi</Text>
                <Text style={styles.textValue}>
                  : {data && data.customer.vehicle[0].plate}
                </Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.textTitle}>Model</Text>
                <Text style={styles.textValue}>
                  : {data && data.customer.vehicle[0].brand}{' '}
                  {data && data.customer.vehicle[0].model}
                </Text>
              </View>
            </>
          )}
        {data?.type === TransactionType.SERVICE && servMemo}
        {partMemo}
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Diskon: </Text>
          <Text style={styles.textDiscountTitle}>{data?.discount}%</Text>
        </View>
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Total Diskon: </Text>
          <Text style={styles.textDiscountTitle}>
            {formatNumber(data?.discount || 0, {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <View style={styles.textTotalContent}>
          <Text style={styles.textProductTitle}>Total Pembayaran</Text>
          <Text style={styles.textAmount}>
            {formatNumber(data?.finalAmount || 0, {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnPrint}>
          <Text style={styles.textBtnPrint}>
            Print <Icon name="print" color={color.white} size={18} />
          </Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomColor: color.darkGray,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {color: color.black, fontSize: 18},
  textAddress: {color: color.darkGray, fontStyle: 'italic'},
  textNormal: {color: color.darkGray},
  detailContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  textTitle: {width: '30%', color: color.darkGray},
  textValue: {
    color: color.black,
    flexWrap: 'wrap',
    flex: 1,
  },
  productContent: {},
  subProductContent: {marginVertical: 10},
  textProductTitle: {color: color.darkGray, minWidth: '40%'},
  textProductPrice: {color: color.darkGray},
  textProduct: {
    color: color.darkGray,
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textTotalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: color.gray,
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  textAmount: {
    fontWeight: 'bold',
    color: color.darkGray,
  },
  textDiscount: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  textDiscountTitle: {color: color.darkGray},
  btnPrint: {
    backgroundColor: color.green,
    marginVertical: 20,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtnPrint: {color: color.white, fontSize: 16},
});
