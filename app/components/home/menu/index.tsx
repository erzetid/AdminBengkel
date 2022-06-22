// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ICON} from '../../../assets/icon/index';
import {text} from '../../../constant/styles';
import {color} from '../../../constant/theme';
import {groupArrayByMultiple} from '../../../helpers';
import MenuButton from '../../MenuButton';

interface MenuButtonProps {
  title: string;
  image: string;
  onPress?: () => void;
}

interface FeatureMenuProps {
  menus?: MenuButtonProps[];
}

export const menusDefault: MenuButtonProps[] = [
  {title: 'Buku Kas', image: ICON.PART.battery},
  {title: 'Konsumen', image: ICON.PART.sparkPlug},
  {title: 'Kendaraan', image: ICON.moto},
  {title: 'Laporan', image: ICON.PART.tire},
  {title: 'Catatan', image: ICON.note},
  {title: 'Donasi', image: ICON.PART.vBelt},
];

const FeatureMenu = ({menus = menusDefault}: FeatureMenuProps) => {
  const mapMenus = groupArrayByMultiple(menus, 3);
  const handleOnPress = (index: number) => {
    switch (index) {
      case 0:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      case 1:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      case 2:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      case 3:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      case 4:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      case 5:
        ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <Text style={text.primaryMedium}>Fitur Aplikasi</Text>
      <View style={styles.card}>
        <ScrollView scrollEnabled={true} nestedScrollEnabled={true}>
          {mapMenus.map((menu, index) => {
            return (
              <View key={index} style={styles.menu}>
                {menu.map((m, i) => (
                  <MenuButton
                    key={i}
                    title={m.title}
                    image={m.image}
                    onPress={() => handleOnPress(i)}
                  />
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FeatureMenu;

const styles = StyleSheet.create({
  content: {
    marginVertical: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: color.lightGray,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'column',
    maxHeight: Dimensions.get('screen').height / 3.2,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
