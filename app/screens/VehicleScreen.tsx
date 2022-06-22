// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {VehicleScreenProps} from './interface';

const VehicleScreen: FC<VehicleScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title="Kendaraan" navigation={navigation} />
    </SecondBackground>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({});
