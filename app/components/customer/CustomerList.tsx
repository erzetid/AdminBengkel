// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ICON} from '../../assets/icon';
import {color} from '../../constant/theme';
import {truncateString} from '../../helpers';
import {ICustomer} from '../../model/Customer';

interface CustomerListProps {
  data: ICustomer[];
  onPressCustomer: (customer: ICustomer) => void;
}

const CustomerList: FC<CustomerListProps> = ({data, onPressCustomer}) => {
  const dataCustomer = useMemo(() => data, [data]);
  const handlePressCustomer = useCallback(
    (c: ICustomer) => onPressCustomer(c),
    [onPressCustomer],
  );
  const render = useMemo(
    () =>
      ({item}: {item: ICustomer}) =>
        (
          <TouchableOpacity
            key={item.id}
            style={styles.cardList}
            onPress={() => handlePressCustomer(item)}>
            <View style={styles.imageContent}>
              <Image source={ICON.customer} style={styles.image} />
            </View>
            <View style={styles.textContent}>
              <Text style={{...styles.textPhone, color: color.yellow}}>
                {item.no}
              </Text>
              <Text style={styles.textName}>
                {truncateString(item.name, 23)}
              </Text>
              <Text style={styles.textPhone}>+62{item.phone}</Text>
              <Text style={styles.textAddress}>
                {truncateString(item.address, 50)}
              </Text>
            </View>
          </TouchableOpacity>
        ),
    [handlePressCustomer],
  );
  return (
    <View style={styles.content}>
      {!data.length && <Text style={styles.text}>Data tidak ditemukan.</Text>}
      <FlatList
        data={dataCustomer}
        initialNumToRender={10}
        windowSize={5}
        renderItem={render}
      />
    </View>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: color.white,
    borderRadius: 5,
    flex: 1,
  },
  cardList: {
    flexDirection: 'row',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  imageContent: {
    borderRadius: 5,
    borderColor: color.lightPurple,
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
  },
  text: {
    color: color.darkGray,
  },
  textContent: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
  },
  textName: {color: color.black, fontSize: 16},
  textPhone: {color: color.darkGray},
  textAddress: {color: color.darkGray},
});
