// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IWorkOrder} from '../../../model/Serv';
import ProcessItem from './ProcessItem';

interface ProcessTabProps {
  data: IWorkOrder[];
  onPressItem: (wo: IWorkOrder) => void;
}
const ProcessTab: FC<ProcessTabProps> = ({onPressItem, data}) => {
  const handleOnPress = useCallback(
    (wo: IWorkOrder) => {
      onPressItem(wo);
    },
    [onPressItem],
  );
  const render = useCallback(
    ({item}: {item: IWorkOrder; index: number}) => (
      <ProcessItem workOrder={item} onPressItem={handleOnPress} />
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

export default ProcessTab;

const styles = StyleSheet.create({content: {flex: 1,}});
