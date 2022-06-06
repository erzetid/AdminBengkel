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
  {title: 'Menu 1', image: ICON.service},
  {title: 'Menu 2', image: ICON.service},
  {title: 'Menu 3', image: ICON.service},
  {title: 'Menu 4', image: ICON.service},
  {title: 'Menu 5', image: ICON.service},
  {title: 'Menu 6', image: ICON.service},
];

const FeatureMenu = ({menus = menusDefault}: FeatureMenuProps) => {
  const mapMenus = groupArrayByMultiple(menus, 3);
  const handleOnPress = (index: number) => {
    ToastAndroid.show(`Menu ${index + 1}`, ToastAndroid.SHORT);
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
