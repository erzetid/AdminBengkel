// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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
      {!data.length && <Text style={styles.text}>Data tidak ditemukan.</Text>}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onItemPress={handleItemPress}
            onSetStock={handleStockModalPress}
          />
        )}
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
  text: {
    color: color.darkGray,
  },
});
