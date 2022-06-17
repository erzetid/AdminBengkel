// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../constant/theme';
import {SecondHeaderProps} from '../screens/interface';

const SecondHeader: FC<SecondHeaderProps> = ({navigation, title}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textBtnBack}>Kembali</Text>
      </TouchableOpacity>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  btnBack: {
    backgroundColor: color.lightPurple,
    padding: 5,
    borderRadius: 20,
    minWidth: 70,
    justifyContent: 'center',
  },
  textBtnBack: {textAlign: 'center'},
  textTitle: {fontSize: 22, marginStart: 50},
});
