// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {text} from '../../../constant/styles';
import {color} from '../../../constant/theme';
import CardBalance from '../../CardBalance';

const Balance = () => {
  return (
    <SafeAreaView style={styles.content}>
      <Text style={text.primaryMedium}>Kas saat ini</Text>
      <View style={styles.card}>
        <CardBalance
          title={'Pemasukan'}
          color={'#91ECC9'}
          backgroundColor={color.darkBlue}
          value={'Rp200,000'}
        />

        <CardBalance
          title={'Pengeluaran'}
          color={'#E04949'}
          backgroundColor={color.lightPurple}
          value={'Rp200,000'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Balance;

const styles = StyleSheet.create({
  content: {marginTop: 0},
  card: {flexDirection: 'row', marginTop: 10},
});
