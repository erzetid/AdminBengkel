// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {CustomerScreenProps} from './interface';

const CustomerScreen: FC<CustomerScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title="Konsumen" navigation={navigation} />
    </SecondBackground>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({});
