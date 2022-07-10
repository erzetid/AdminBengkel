// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {color} from '../../../constant/theme';
import ItemTab, {ItemProps} from './ItemTab';

const DoneItem: FC<ItemProps> = ({onPressItem, workOrder}) => {
  const doneTime = useMemo(() => workOrder.doneTime, [workOrder.doneTime]);
  return (
    <ItemTab onPressItem={onPressItem} workOrder={workOrder}>
      <Text style={styles.textRegular}>Selesai</Text>
      <Text style={styles.textEstimate}>
        Pukul{' '}
        {formatDate(doneTime, 'HH:mm', {
          locale: id,
        })}
      </Text>
    </ItemTab>
  );
};

export default DoneItem;

const styles = StyleSheet.create({
  textEstimate: {
    paddingHorizontal: 3,
    borderRadius: 50,
    color: color.white,
    fontSize: 12,
    backgroundColor: color.green,
  },
  textRegular: {color: color.darkGray},
});
