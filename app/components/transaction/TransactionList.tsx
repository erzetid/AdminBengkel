// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {FC, useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import {FlatList} from 'react-native-gesture-handler';
import {ICON} from '../../assets/icon';
import {TransactionStatus, TransactionType} from '../../constant/enum';
import {text} from '../../constant/styles';
import {color} from '../../constant/theme';
import {ITransaction} from '../../model/Transaction';

interface TransactionListProps {
  data: ITransaction[];
  onPressItem: (tx: ITransaction) => void;
}

const TransactionList: FC<TransactionListProps> = ({data, onPressItem}) => {
  const handleOnPressItem = useCallback(
    (tx: ITransaction) => {
      onPressItem(tx);
    },
    [onPressItem],
  );

  const render = ({item}: {item: ITransaction}) => (
    <TouchableOpacity
      style={styles.content}
      onPress={() => handleOnPressItem(item)}>
      <View style={styles.imageContent}>
        <Image
          source={
            item.type === TransactionType.PART
              ? ICON.PART.sparePart
              : ICON.service
          }
          style={styles.image}
        />
      </View>
      <View style={styles.textContent}>
        <Text style={text.secondaryMediumBold}>{`${item.no}`}</Text>
        <Text style={text.secondarySmall}>
          Nama:
          <Text style={styles.textId}>{` ${item.customer.name}`}</Text>
        </Text>
        <Text style={styles.textPrice}>
          {formatNumber(item.amount, {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })}
        </Text>
      </View>
      <View>
        <Text style={styles.textItemType}>{item.type}</Text>
        <Text
          style={
            item.status === TransactionStatus.PAID
              ? styles.textPaid
              : styles.textUnpaid
          }>
          {item.status.toUpperCase()}
        </Text>
        <Text style={text.secondarySmall}>
          {formatDate(item.time, 'dd/LL/yyyy HH:mm', {
            locale: id,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.flatList}>
      {!data.length ? (
        <Text style={styles.text}>Data tidak ditemukan.</Text>
      ) : (
        <FlatList
          data={data}
          initialNumToRender={10}
          windowSize={5}
          renderItem={render}
        />
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
    backgroundColor: color.white,
    borderRadius: 5,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  text: {
    color: color.darkGray,
  },
  imageContent: {
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContent: {
    flexGrow: 1,
    marginStart: 5,
    flexShrink: 1,
    flexDirection: 'column',
  },
  textId: {color: color.black},
  textPrice: {color: color.yellow},
  textItemType: {
    fontSize: 12,
    color: color.lightBlue,
    backgroundColor: color.white,
    borderColor: color.lightBlue,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  textPaid: {
    fontSize: 12,
    color: color.white,
    backgroundColor: color.green,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  textUnpaid: {
    fontSize: 12,
    color: color.white,
    backgroundColor: color.red,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});
