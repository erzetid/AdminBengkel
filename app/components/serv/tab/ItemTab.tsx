// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, ReactNode, useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../../constant/theme';
import {IWorkOrder} from '../../../model/Serv';

export interface ItemProps {
  workOrder: IWorkOrder;
  onPressItem: (workOrder: IWorkOrder) => void;
}
interface ItemTabProps {
  workOrder: IWorkOrder;
  onPressItem: (workOrder: IWorkOrder) => void;
  children: ReactNode;
}

const ItemTab: FC<ItemTabProps> = ({children, workOrder, onPressItem}) => {
  const wo = useMemo(() => workOrder, [workOrder]);
  const handleOnPress = useCallback(() => onPressItem(wo), [onPressItem, wo]);
  return (
    <TouchableOpacity
      key={wo.id!}
      style={styles.content}
      onPress={handleOnPress}>
      <View style={styles.queueContent}>
        <Text style={styles.textQueueTitle}>Antrean</Text>
        <Text style={styles.textQueue}>{wo.queue}</Text>
      </View>
      <View style={styles.detailContent}>
        <View style={styles.vehicleContent}>
          <Text style={styles.textPlate}>{wo.vehicle.plate}</Text>
          <Text style={styles.textType}>{wo.vehicle.model}</Text>
        </View>
        <Text style={styles.textRegular}>{wo.customer.name}</Text>
      </View>
      <View style={styles.statusContent}>{children}</View>
    </TouchableOpacity>
  );
};

export default ItemTab;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    margin: 5,
    padding: 5,
  },
  queueContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderColor: color.lightPurple,
    borderWidth: 2,
    borderRadius: 5,
  },
  textQueueTitle: {color: color.lightPurple, fontSize: 12},
  textQueue: {fontSize: 18, fontWeight: 'bold', color: color.lightPurple},
  detailContent: {flexGrow: 1, marginHorizontal: 10, flexDirection: 'column'},
  textPlate: {color: color.black, fontSize: 18, fontWeight: 'bold'},
  textType: {
    borderColor: color.yellow,
    borderWidth: 1,
    color: color.yellow,
    fontSize: 12,
    marginStart: 3,
    borderRadius: 50,
    paddingHorizontal: 3,
  },
  textRegular: {color: color.darkGray},
  vehicleContent: {flexDirection: 'row', alignItems: 'flex-start'},
  statusContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
