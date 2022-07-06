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
        {formatDate(doneTime, 'dd LLL yyyy HH:mm', {
          locale: id,
        })}
      </Text>
    </ItemTab>
  );
};

export default DoneItem;

const styles = StyleSheet.create({
  textEstimate: {
    borderColor: color.green,
    borderWidth: 1,
    paddingHorizontal: 3,
    borderRadius: 5,
    color: color.green,
    fontSize: 12,
  },
  textRegular: {color: color.darkGray},
});
