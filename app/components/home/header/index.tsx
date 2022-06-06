// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ICON} from '../../../assets/icon/index';
import {text} from '../../../constant/styles';
import {color} from '../../../constant/theme';
import {ScreenProps} from '../../../screens/interface';
import CardButton from '../../CardButton';

const cardButton = [
  {id: 1, name: 'Servis', image: ICON.service, screen: 'ServiceScreen'},
  {id: 2, name: 'Spare Part', image: ICON.sparePart, screen: 'PartScreen'},
  {id: 3, name: 'Laporan', image: ICON.report, screen: 'ReportScreen'},
];

interface HeaderProps extends ScreenProps {}

const Header: FC<HeaderProps> = ({navigation}) => {
  const onPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <View style={styles.info}>
        <View>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={{fontSize: 22}}>Bengkel Cometor</Text>
          <Text style={text.primarySmall}>
            {'Menyawak, mau profit berapa hari ini? '}
          </Text>
        </View>
        <View style={styles.settingButton}>
          <Pressable>
            <Image source={ICON.workshop} />
          </Pressable>
        </View>
      </View>
      <View style={styles.mainButton}>
        {cardButton.map(btn => (
          <CardButton
            key={btn.id}
            title={btn.name}
            onPress={() => onPress(btn.screen)}
            image={btn.image}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  info: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingButton: {
    padding: 5,
    backgroundColor: color.darkBlue,
    borderRadius: 50,
    marginTop: -40,
    right: -18,
  },
  mainButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: color.lightPurple,
    height: 80,
    elevation: 5,
  },
});
