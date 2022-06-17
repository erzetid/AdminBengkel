// Copyright (c) 2022 fahrizalm14
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
  },
  background: {
    flex: 1,
    padding: 10,
  },
});
