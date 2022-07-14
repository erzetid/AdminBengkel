// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {color} from '../../../constant/theme';
import ItemTab, {ItemProps} from './ItemTab';

const QueueItem: FC<ItemProps> = ({onPressItem, workOrder}) => {
  const totalTime = useMemo(
    () => workOrder.serv.reduce((a, b) => a + b.processTime, 0),
    [workOrder.serv],
  );
  return (
    <ItemTab onPressItem={onPressItem} workOrder={workOrder}>
      <Text style={styles.textRegular}>Estimasi</Text>
      <Text style={styles.textEstimate}>{totalTime} Menit</Text>
    </ItemTab>
  );
};

export default QueueItem;

const styles = StyleSheet.create({
  textEstimate: {
    backgroundColor: color.lightBlue,
    paddingHorizontal: 3,
    borderRadius: 50,
    color: color.white,
  },
  textRegular: {color: color.darkGray},
});
