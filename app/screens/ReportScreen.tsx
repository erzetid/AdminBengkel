// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../constant/theme';
import {ReportScreenProps} from './interface';

const ReportScreen: FC<ReportScreenProps> = () => {
  return (
    <View>
      <Text style={styles.text}>ReportScreen</Text>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
});
