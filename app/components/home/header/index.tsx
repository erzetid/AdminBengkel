// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../../../assets/icon/index';
import {text} from '../../../constant/styles';
import {color} from '../../../constant/theme';
import {truncateString} from '../../../helpers';
import {IWorkshop} from '../../../model/Workshop';
import {ScreenProps} from '../../../screens/interface';
import CardButton from '../../CardButton';

interface HeaderProps extends ScreenProps {
  onPressSet: () => void;
  workshop: IWorkshop;
}

const Header: FC<HeaderProps> = ({navigation, workshop, onPressSet}) => {
  const onPress = useCallback(
    (screen: string) => {
      navigation?.navigate(screen);
    },
    [navigation],
  );

  const button = useMemo(
    () =>
      [
        {id: 1, name: 'Servis', image: ICON.service, screen: 'ServiceScreen'},
        {
          id: 2,
          name: 'Spare Part',
          image: ICON.sparePart,
          screen: 'PartScreen',
        },
        {
          id: 3,
          name: 'Transaksi',
          image: ICON.PART.coolant,
          screen: 'TransactionScreen',
        },
      ].map(btn => (
        <CardButton
          key={btn.id}
          title={btn.name}
          onPress={() => onPress(btn.screen)}
          image={btn.image}
        />
      )),
    [onPress],
  );
  return (
    <SafeAreaView>
      <View style={styles.info}>
        <View>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={{fontSize: 22, color: color.lightGray}}>
            {truncateString(workshop.name, 20)}
          </Text>
          <Text style={text.primarySmall}>
            {workshop.owner}, mau profit berapa hari ini?
          </Text>
        </View>
        <View style={styles.settingButton}>
          <TouchableOpacity onPress={onPressSet}>
            <Icon name="ios-settings-outline" size={30} color={color.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainButton}>{button}</View>
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
    right: -10,
    elevation: 1,
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
