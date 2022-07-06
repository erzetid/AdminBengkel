// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IWorkOrder} from '../../../model/Serv';
import QueueItem from './QueueItem';

interface QueueTabProps {
  data: IWorkOrder[];
  onPressItem: (wo: IWorkOrder) => void;
}

const QueueTab: FC<QueueTabProps> = ({data, onPressItem}) => {
  const handleOnPress = (wo: IWorkOrder) => {
    onPressItem(wo);
  };
  const render = ({item}: {item: IWorkOrder; index: number}) => (
    <QueueItem workOrder={item} onPressItem={handleOnPress} />
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

export default QueueTab;

const styles = StyleSheet.create({content: {flex: 1}});
