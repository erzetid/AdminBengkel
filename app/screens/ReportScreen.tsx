// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {ReportScreenProps} from './interface';

const ReportScreen: FC<ReportScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader
        title="Laporan"
        navigation={navigation}
        titleColor={color.white}
      />
    </SecondBackground>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
});
