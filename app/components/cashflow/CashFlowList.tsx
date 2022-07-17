// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import {CashFlowType} from '../../constant/enum';
import {color} from '../../constant/theme';
import {ICashFlow} from '../../model/CashFlow';

interface CashFlowListProps {
  data: ICashFlow[];
}

const setCurr = (num: number) =>
  formatNumber(num, {
    prefix: 'Rp',
    delimiter: ',',
    signPosition: 'beforePrefix',
  });

const CashFlowList: FC<CashFlowListProps> = ({data}) => {
  const income = (num: number) => (
    <Text style={styles.income}>{setCurr(num)}</Text>
  );
  const outcome = (num: number) => (
    <Text style={styles.outcome}>- {setCurr(num)}</Text>
  );
  const render = ({item}: {item: ICashFlow}) => (
    <View style={styles.contentList}>
      <Text style={styles.textTime}>
        {formatDate(item.time, 'dd LLL yyyy', {
          locale: id,
        })}
      </Text>
      <Text style={styles.textNo}>{item.no}</Text>
      {item.type === CashFlowType.INCOME
        ? income(item.amount)
        : outcome(item.amount)}
      <View style={styles.contentCategory}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: color.lightBlue,
            alignSelf: 'flex-start',
            paddingHorizontal: 3,
            borderRadius: 5,
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: color.white,
              textAlign: 'center',
            }}>
            {item.category.toLowerCase()}
          </Text>
        </Text>
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.contentList}>
        <Text style={styles.textTime}>Tanggal</Text>
        <Text style={styles.textNo}>Nomor</Text>
        <Text style={styles.textType}>Nominal</Text>
        <View style={styles.contentCategory}>
          <Text style={styles.textCategory}>Jenis</Text>
        </View>
      </View>
      <View style={styles.content}>
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
    </>
  );
};

export default CashFlowList;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: color.white,
  },
  contentList: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: 3,
    backgroundColor: color.lightGray,
  },
  text: {color: color.darkGray},
  textTime: {color: color.darkGray, width: '23%'},
  textNo: {color: color.darkGray, width: '37%'},
  textType: {color: color.darkGray, width: '25%'},
  textCategory: {
    color: color.darkGray,
  },
  contentCategory: {width: '15%'},
  income: {color: color.green, width: '25%'},
  outcome: {color: color.red, width: '25%'},
});
