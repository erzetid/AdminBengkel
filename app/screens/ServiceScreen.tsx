// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../constant/theme';
import {ServiceScreenProps} from './interface';

const ServiceScreen: FC<ServiceScreenProps> = () => {
  return (
    <View>
      <Text style={styles.text}>ServiceScreen</Text>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
});
