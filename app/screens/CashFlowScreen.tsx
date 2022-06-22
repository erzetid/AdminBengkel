// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {CashFlowScreenProps} from './interface';

const CashFlowScreen: FC<CashFlowScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title="Buku Kas" navigation={navigation} />
    </SecondBackground>
  );
};

export default CashFlowScreen;

const styles = StyleSheet.create({});
