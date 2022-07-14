// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {CashFlowScreenProps} from './interface';

const CashFlowScreen: FC<CashFlowScreenProps> = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SecondBackground>
      <SecondHeader
        title="Buku Kas"
        navigation={navigation}
        titleColor={color.white}
      />
    </SecondBackground>
  );
};

export default CashFlowScreen;

const styles = StyleSheet.create({});
