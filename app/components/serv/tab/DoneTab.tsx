// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {IWorkOrder} from '../../../model/Serv';
import DoneItem from './DoneItem';
interface DoneTabProps {
  data: IWorkOrder[];
  onPressItem: (wo: IWorkOrder) => void;
}

const DoneTab: FC<DoneTabProps> = ({onPressItem, data}) => {
  const handleOnPress = useCallback(
    (wo: IWorkOrder) => {
      onPressItem(wo);
    },
    [onPressItem],
  );
  const render = useCallback(
    ({item}: {item: IWorkOrder; index: number}) => (
      <DoneItem workOrder={item} onPressItem={handleOnPress} />
    ),
    [handleOnPress],
  );
  return (
    <View style={styles.content}>
      <FlatList
        data={data}
        initialNumToRender={10}
        windowSize={5}
        renderItem={render}
      />
    </View>
  );
};

export default DoneTab;

const styles = StyleSheet.create({content: {flex: 1}});
