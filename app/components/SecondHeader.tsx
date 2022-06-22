// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/theme';
import {SecondHeaderProps} from '../screens/interface';

const SecondHeader: FC<SecondHeaderProps> = ({
  navigation,
  title,
  titleColor,
  btnTextColor,
}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation?.goBack()}>
        <Icon name="ios-chevron-back-outline" />
        <Text
          style={
            {...styles.btnBack, color: btnTextColor} || styles.textBtnBack
          }>
          Kembali
        </Text>
      </TouchableOpacity>
      <Text
        style={{...styles.textTitle, color: titleColor} || styles.textTitle}>
        {title}
      </Text>
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  btnBack: {
    backgroundColor: color.lightPurple,
    paddingVertical: 5,
    borderRadius: 20,
    minWidth: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    color: color.white,
  },
  textBtnBack: {textAlign: 'center'},
  textTitle: {fontSize: 22, marginStart: 50, color: color.lightGray},
});
