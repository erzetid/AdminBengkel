// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, TextInput} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../assets/icon';
import BottomSheetDetail from '../components/part/BottomSheetDetail';
import BottomSheetStock from '../components/part/BottomSheetStock';
import PartList from '../components/part/PartList';
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {PartDetail, ServiceScreenProps} from './interface';

const SPAREPARTS = [
  {
    id: '1',
    name: 'Busi Sx125',
    code: '14522-U25-FC',
    category: 'engine',
    description: '',
    quantity: 100,
    price: 25000,
    image: ICON.PART.sparkPlug,
    location: 'E1.1.1',
  },
  {
    id: '2',
    name: 'Lampu Depan Supra X 125',
    code: '34405-U25-FC',
    category: 'electrical',
    description: '',
    quantity: 250,
    price: 28000,
    image: ICON.PART.lamp,
    location: 'E1.1.1',
  },
  {
    id: '3',
    name: 'Kampas rem depan SX125',
    code: '06450-KVB-901',
    category: 'frame',
    description: '',
    quantity: 115,
    price: 26000,
    image: ICON.PART.brake,
    location: 'E1.1.1',
  },
];

const actions = [
  {
    text: 'Tambah Spare Part',
    icon: <Icon name="ios-add-circle-outline" size={20} color={color.white} />,
    name: 'btnAddPart',
    position: 2,
    color: color.lightPurple,
  },
  {
    text: 'Buat Penjualan Part',
    icon: <Icon name="ios-cart" size={20} color={color.white} />,
    name: 'btnBuyPart',
    position: 1,
    color: color.lightPurple,
  },
];

const PartScreen: FC<ServiceScreenProps> = ({navigation}) => {
  const stockModalRef = useRef<BottomSheetModal>(null);
  const detailModalRef = useRef<BottomSheetModal>(null);
  const searchBarRef = useRef<TextInput>(null);
  const searchBarText = useRef<string>('');
  const [detail, setDetail] = useState<PartDetail | undefined>();
  const [stockModalValue, setStockModalValue] = useState<PartDetail>();
  const [stockAlert, setStockAlert] = useState(false);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const backAction = () => {
      stockModalRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const handleSetStock = useCallback((value: PartDetail) => {
    stockModalRef.current?.present();
    setStockModalValue(value);
    setStock(value.quantity);
  }, []);

  const handleItemPress = useCallback((value: PartDetail) => {
    setDetail(value);
    detailModalRef.current?.present();
  }, []);
  return (
    <SecondBackground>
      <SecondHeader navigation={navigation} title={'Spare Part'} />
      <SearchBar
        ref={searchBarRef}
        title={'Carai nama/nomor part'}
        onPress={() => console.log(searchBarText.current)}
        onChangeText={text => {
          if (searchBarRef.current) {
            searchBarText.current = text;
          }
        }}
      />
      <PartList
        data={SPAREPARTS}
        handleItemPress={handleItemPress}
        handleStockModalPress={handleSetStock}
      />
      <BottomSheetDetail
        ref={detailModalRef}
        detail={detail}
        navigation={navigation}
      />
      <BottomSheetStock
        stock={stock}
        setStock={setStock}
        ref={stockModalRef}
        item={stockModalValue}
        onChangeText={text => console.log(text)}
        onSave={id => {
          console.log(id);
          setStockAlert(true);
        }}
      />
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
        color={color.yellow}
        overlayColor={'rgba(0, 0, 0, 0.6)'}
        actionsPaddingTopBottom={0}
      />
      <AwesomeAlert
        show={stockAlert}
        message="Stok berhasil diperbarui!"
        progressColor={color.lightPurple}
        showProgress={true}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelButtonColor={color.lightPurple}
        cancelText="Tutup"
        onCancelPressed={() => {
          setStockAlert(false);
        }}
      />
    </SecondBackground>
  );
};

export default PartScreen;
