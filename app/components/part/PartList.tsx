// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {color} from '../../constant/theme';
import {PartListProps} from '../../screens/interface';
import RenderItem from './RenderItem';

const PartList: FC<PartListProps> = ({
  handleItemPress,
  handleStockModalPress,
  data,
}) => {
  return (
    <View style={styles.flatListContent}>
      <FlatList
        data={data}
        renderItem={item =>
          RenderItem(item, handleItemPress, handleStockModalPress)
        }
      />
    </View>
  );
};

export default PartList;

const styles = StyleSheet.create({
  flatListContent: {
    padding: 10,
    backgroundColor: color.white,
    borderRadius: 5,
    flex: 1,
  },
});
