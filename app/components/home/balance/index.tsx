// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import {text} from '../../../constant/styles';
import {color} from '../../../constant/theme';
import CardBalance from '../../CardBalance';

interface BalanceProps {
  income: number;
  outcome: number;
}

const Balance: FC<BalanceProps> = ({income, outcome}) => {
  return (
    <SafeAreaView style={styles.content}>
      <Text style={text.primaryMedium}>Kas saat ini</Text>
      <View style={styles.card}>
        <CardBalance
          title={'Pemasukan'}
          color={'#91ECC9'}
          backgroundColor={color.darkBlue}
          value={formatNumber(income, {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })}
        />
        <View style={styles.margin} />
        <CardBalance
          title={'Pengeluaran'}
          color={'#E04949'}
          backgroundColor={color.lightPurple}
          value={formatNumber(outcome, {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })}
        />
      </View>
    </SafeAreaView>
  );
};

export default Balance;

const styles = StyleSheet.create({
  content: {
    marginTop: 0,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  margin: {width: 10},
  card: {flexDirection: 'row', marginTop: 10},
});
