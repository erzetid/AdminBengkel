// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../../constant/theme';
import {BottomSheetStockProps} from '../../screens/interface';
import BackdropBS from '../BackdropBS';

const emptyDetail = {
  id: '0',
  name: '',
  code: '',
  category: '',
  description: '',
  quantity: 0,
  price: 0,
  buyPrice: 0,
  image: 'sparePart',
  location: '',
};
const BottomSheetStock = forwardRef<BottomSheetModal, BottomSheetStockProps>(
  ({item = emptyDetail, stock, setStock, onSave}, ref) => {
    const snapPoints = useMemo(() => ['25%'], []);
    const [isFocus, setIsFocus] = useState(false);

    const handleStockMinus = () => {
      if (stock > 0) {
        setStock(stock - 1);
      }
    };

    const handleStockPlus = () => {
      setStock(stock + 1);
    };
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        style={styles.content}>
        <Text style={styles.itemNameText}>{item.name}</Text>
        <View style={styles.detailContent}>
          <Text style={styles.itemCodeText}>{item.code}</Text>
          <View style={styles.stockContent}>
            <Text style={styles.itemQuantityText}>
              Stok saat ini: {item.quantity}
            </Text>
          </View>
        </View>
        <View style={styles.btnContent}>
          <TouchableOpacity style={styles.btnPlus} onPress={handleStockPlus}>
            <Icon name="ios-add-outline" size={30} color={color.white} />
          </TouchableOpacity>
          <BottomSheetTextInput
            value={stock.toString()}
            maxLength={4}
            keyboardType={'number-pad'}
            style={styles.stockTextInput}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChangeText={text => {
              setStock(parseInt(text, 10) || 0);
            }}
          />
          <TouchableOpacity style={styles.btnMinus} onPress={handleStockMinus}>
            <Icon
              name="ios-remove-outline"
              size={30}
              color={color.lightPurple}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={
            (isFocus && {...styles.btnSave, backgroundColor: color.gray}) ||
            styles.btnSave
          }
          disabled={isFocus}
          onPress={() => onSave(item.id!)}>
          <Text style={styles.btnSaveText}>Simpan</Text>
        </TouchableOpacity>
      </BottomSheetModal>
    );
  },
);

export default BottomSheetStock;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 24,
    paddingHorizontal: 20,
    flex: 1,
  },
  itemNameText: {color: color.black},
  detailContent: {flexDirection: 'row', justifyContent: 'space-between'},
  itemCodeText: {color: color.darkGray},
  stockContent: {
    borderColor: color.purple,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
  },
  itemQuantityText: {
    color: color.purple,
    fontSize: 10,
    marginHorizontal: 3,
    textAlign: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnPlus: {
    backgroundColor: color.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  stockTextInput: {
    alignSelf: 'stretch',
    color: color.darkGray,
    textAlign: 'center',
    fontSize: 25,
    borderBottomColor: color.darkGray,
    borderBottomWidth: 1,
    paddingBottom: -5,
    marginBottom: 5,
  },
  btnMinus: {
    borderColor: color.lightPurple,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  btnSave: {
    backgroundColor: color.yellow,
    padding: 5,
    borderRadius: 10,
    paddingBottom: 10,
  },
  btnSaveText: {color: color.white, textAlign: 'center', fontSize: 16},
});
