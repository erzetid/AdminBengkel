// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {color} from '../../constant/theme';
import {PartDetail, PartListProps} from '../../screens/interface';
import RenderItem from './RenderItem';

const PartList: FC<PartListProps> = ({
  handleItemPress,
  handleStockModalPress,
  data,
}) => {
  const handleItem = useCallback(
    (value: PartDetail) => {
      handleItemPress(value);
    },
    [handleItemPress],
  );
  const handleStockModal = useCallback(
    (value: PartDetail) => {
      handleStockModalPress(value);
    },
    [handleStockModalPress],
  );
  const render = useMemo(
    () =>
      ({item}: {item: PartDetail}) =>
        (
          <RenderItem
            key={item.id}
            item={item}
            onItemPress={handleItem}
            onSetStock={handleStockModal}
          />
        ),
    [handleItem, handleStockModal],
  );
  return (
    <View style={styles.flatListContent}>
      {!data.length && <Text style={styles.text}>Data tidak ditemukan.</Text>}
      <FlatList
        data={data}
        renderItem={render}
        initialNumToRender={10}
        windowSize={5}
      />
      {/* <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageButton}>
          <Icon name="ios-chevron-back-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          style={{...styles.pageButton, backgroundColor: color.lightBlue}}>
          <Text style={styles.pageNumber}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageNumber}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageNumber}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageNumber}>5</Text>
        </TouchableOpacity>
      </View> */}
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
  pagination: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginStart: 100,
  },
  pageButton: {
    backgroundColor: color.gray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 5,
    marginLeft: 5,
    marginBottom: 2,
  },
  pageNumber: {
    color: color.white,
    fontSize: 16,
  },
});
