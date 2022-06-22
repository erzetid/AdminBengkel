// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {ServiceScreenProps} from './interface';

const ServiceScreen: FC<ServiceScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title={'Servis'} navigation={navigation} />
    </SecondBackground>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
});
