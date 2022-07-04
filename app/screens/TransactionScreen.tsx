// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {TransactionScreenProps} from './interface';

const TransactionScreen: FC<TransactionScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader
        title="Transaksi"
        navigation={navigation}
        titleColor={color.white}
      />
    </SecondBackground>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({});
