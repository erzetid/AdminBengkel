// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../../assets/icon';
import {text} from '../../constant/styles';
import {color} from '../../constant/theme';
import {IServ} from '../../model/Serv';

interface ServListProps {
  servs: IServ[];
  onUpdate: (v: IServ) => void;
  onDelete: (v: IServ) => void;
}

const ServList: FC<ServListProps> = ({servs, onUpdate, onDelete}) => {
  const render = ({item}: {item: IServ}) => (
    <View style={styles.content}>
      <View style={styles.imageContent}>
        <Image source={ICON.service} style={styles.image} />
      </View>
      <View style={styles.textContent}>
        <Text style={text.secondaryMediumBold}>{`${item.name}`}</Text>
        <Text style={text.secondarySmall}>
          Kode:
          <Text style={styles.textId}>{` ${item.id}`}</Text>
        </Text>
        <Text style={styles.textPrice}>
          {formatNumber(item.price, {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })}
        </Text>
      </View>
      <View style={styles.actionContent}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => onUpdate(item)}>
          <Icon name="ios-create-outline" style={text.primaryMedium} />
          <Text style={text.primaryMedium}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => onDelete(item)}>
          <Icon name="ios-trash-outline" style={text.primaryMedium} />
          <Text style={text.primaryMedium}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.flatList}>
      {!servs?.length && <Text style={styles.text}>Data tidak ditemukan.</Text>}
      <BottomSheetFlatList
        data={servs}
        initialNumToRender={10}
        windowSize={5}
        renderItem={render}
      />
    </View>
  );
};

export default ServList;

const styles = StyleSheet.create({
  flatList: {flex: 1},
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  text: {
    color: color.darkGray,
  },
  imageContent: {
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContent: {
    flexGrow: 1,
    marginStart: 5,
    flexShrink: 1,
    flexDirection: 'column',
  },
  textId: {color: color.black},
  textPrice: {color: color.yellow},
  actionContent: {flexDirection: 'column', alignItems: 'center'},
  btnEdit: {
    backgroundColor: color.lightPurple,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 3,
    borderRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    width: 70,
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: color.darkGray,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 3,
    borderRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    width: 70,
    alignItems: 'center',
  },
});
