// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {BACKGROUND} from '../assets/images';
import {color} from '../constant/theme';

const SecondBackground: FC = ({children}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={BACKGROUND.primary} style={styles.background}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SecondBackground;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: Dimensions.get('screen').height,
    color: color.lightPurple,
  },
  background: {
    flex: 1,
    padding: 10,
  },
});
