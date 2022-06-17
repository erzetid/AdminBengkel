// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import {color} from '../../constant/theme';
import {PartDetail} from '../../screens/interface';

const RenderItem = (
  {item}: {item: PartDetail},
  onItemPress: (item: PartDetail) => void,
  onSetStock: (item: PartDetail) => void,
) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.content}
      onPress={() => onItemPress(item)}>
      <View style={styles.imageContent}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.itemNameText}>{item.name}</Text>
        <Text style={styles.itemNoText}>No part: {item.code}</Text>
        <Text style={styles.itemPriceText}>
          {formatNumber(item.price, {
            prefix: 'Rp ',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })}
        </Text>
      </View>
      <View style={styles.setStockContent}>
        <TouchableOpacity
          style={styles.btnSetStock}
          onPress={() => console.log('first')}>
          <Text style={styles.btnSetStockText} onPress={() => onSetStock(item)}>
            Atur Stok
          </Text>
        </TouchableOpacity>
        <Text style={styles.itemStockText}>Stok: {item.quantity}</Text>
        <View style={styles.locationContent}>
          <Text style={styles.itemLocationText}>Lokasi: {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 2,
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
  },
  imageContent: {
    paddingVertical: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  detailContent: {
    flexShrink: 1,
    flexDirection: 'column',
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  itemNameText: {
    color: color.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemNoText: {color: color.darkGray, fontSize: 12},
  itemPriceText: {color: color.yellow, fontSize: 12},
  setStockContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnSetStock: {
    borderColor: color.lightBlue,
    borderWidth: 1,
    padding: 4,
    borderRadius: 30,
  },
  btnSetStockText: {
    fontSize: 12,
    color: color.lightBlue,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  itemStockText: {color: color.darkGray, fontSize: 12},
  locationContent: {
    backgroundColor: color.purple,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
  },
  itemLocationText: {
    color: color.white,
    fontSize: 10,
    marginHorizontal: 3,
    textAlign: 'center',
  },
});
