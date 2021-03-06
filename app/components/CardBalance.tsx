// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CardBalanceProps {
  title: string;
  value: string;
  backgroundColor: string;
  color: string;
}

export default ({title, value, backgroundColor, color}: CardBalanceProps) => {
  return (
    <View style={{...styles.content, backgroundColor}}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={{...styles.textValue, color}}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    borderRadius: 5,
    minHeight: 60,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textTitle: {color: '#EDE4E4'},
  textValue: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
