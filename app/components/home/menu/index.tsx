// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
  id: number;
  onPress?: () => void;
}

interface FeatureMenuProps {
  menus?: MenuButtonProps[];
  navigation?: NavigationProp<ParamListBase>;
}

export const menusDefault: MenuButtonProps[] = [
  {title: 'Buku Kas', image: ICON.PART.battery, id: 0},
  {title: 'Konsumen', image: ICON.PART.sparkPlug, id: 1},
  {title: 'Kendaraan', image: ICON.moto, id: 2},
  {title: 'Laporan', image: ICON.PART.tire, id: 3},
  {title: 'Catatan', image: ICON.note, id: 4},
  {title: 'Donasi', image: ICON.PART.vBelt, id: 5},
];

const FeatureMenu = ({menus = menusDefault, navigation}: FeatureMenuProps) => {
  const mapMenus = groupArrayByMultiple(menus, 3);
  const handleOnPress = (index: number) => {
    switch (index) {
      case 0:
        navigation?.navigate('CashFlowScreen');
        break;
      case 1:
        navigation?.navigate('CustomerScreen');
        break;
      case 2:
        navigation?.navigate('VehicleScreen');
        break;
      case 3:
        navigation?.navigate('ReportScreen');
        break;
      case 4:
        navigation?.navigate('NoteScreen');
        break;
      case 5:
        navigation?.navigate('DonationScreen');
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
                {menu.map(m => (
                  <MenuButton
                    key={m.id}
                    title={m.title}
                    image={m.image}
                    onPress={() => handleOnPress(m.id)}
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
