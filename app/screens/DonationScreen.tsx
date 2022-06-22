// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {DonationScreenProps} from './interface';

const DonationScreen: FC<DonationScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title="Donasi" navigation={navigation} />
    </SecondBackground>
  );
};

export default DonationScreen;

const styles = StyleSheet.create({});
