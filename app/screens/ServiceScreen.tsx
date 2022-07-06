// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import TabViewServ from '../components/serv/TabViewServ';
import {color} from '../constant/theme';
import {ServiceScreenProps} from './interface';

const actions = [
  {
    text: 'Data Jasa Servis',
    icon: <Icon name="ios-calculator" size={20} color={color.white} />,
    name: 'btnAddPart',
    position: 2,
    color: color.lightPurple,
  },
  {
    text: 'Pendaftaran Servis',
    icon: <Icon name="ios-document-text" size={20} color={color.white} />,
    name: 'btnBuyPart',
    position: 1,
    color: color.lightPurple,
  },
];
const ServiceScreen: FC<ServiceScreenProps> = ({navigation}) => {
  const floatingActionMemo = useMemo(() => {
    return (
      <FloatingAction
        actions={actions}
        onPressItem={(name: string | undefined) => {
          switch (name) {
            case 'btnAddPart':
              break;
            case 'btnBuyPart':
              break;
            default:
              break;
          }
        }}
        color={color.yellow}
        overlayColor={'rgba(0, 0, 0, 0.6)'}
      />
    );
  }, []);
  return (
    <SecondBackground>
      <SecondHeader
        title={'Servis'}
        navigation={navigation}
        titleColor={color.white}
      />
      <View style={styles.board}>
        <View style={styles.boardQueue}>
          <Text style={styles.textBoard}>Antrean</Text>
          <Text style={styles.amountBoard}>
            <Icon name="ios-stats-chart" size={18} /> 0
          </Text>
        </View>
        <View style={styles.boardProgress}>
          <Text style={styles.textBoard}>Proses</Text>
          <Text style={styles.amountBoard}>
            <Icon name="ios-bicycle" size={18} /> 0
          </Text>
        </View>
        <View style={styles.boardDone}>
          <Text style={styles.textBoard}>Selesai</Text>
          <Text style={styles.amountBoard}>
            <Icon name="ios-checkmark-done" size={18} /> 0
          </Text>
        </View>
      </View>
      <TabViewServ />
      {floatingActionMemo}
    </SecondBackground>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
  board: {flexDirection: 'row', justifyContent: 'space-between'},
  boardQueue: {
    flexGrow: 1,
    backgroundColor: color.red,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  boardProgress: {
    flexGrow: 1,
    backgroundColor: color.lightBlue,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  boardDone: {
    flexGrow: 1,
    marginVertical: 5,
    backgroundColor: color.green,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  textBoard: {color: color.white, fontWeight: 'bold'},
  amountBoard: {color: color.white, fontSize: 20},
});
