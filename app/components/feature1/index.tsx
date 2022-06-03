// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {Platform, StyleSheet, ToastAndroid, View} from 'react-native';
import {ICON} from '../../assets/icon/index';
import {color} from '../../constant/theme';
import CardButton from './CardButton';

const cardButton = [
  {id: 1, name: 'Servis', image: ICON.service},
  {id: 2, name: 'Spare Part', image: ICON.sparePart},
  {id: 3, name: 'Laporan', image: ICON.report},
];
const Feature1 = () => {
  const onPress = (id: number) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(id.toString(), 1);
    }
  };

  return (
    <View style={styles.content}>
      {cardButton.map(btn => (
        <CardButton
          key={btn.id}
          title={btn.name}
          onPress={() => onPress(btn.id)}
          image={btn.image}
        />
      ))}
    </View>
  );
};

export default Feature1;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: color.lightPurple,
    height: 80,
    elevation: 5,
  },
});
