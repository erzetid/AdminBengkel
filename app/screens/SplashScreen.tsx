// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SPLASH} from '../assets/images';
import {color} from '../constant/theme';
import {SplashScreenProps} from './interface';

const SplashScreen: FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation?.navigate('HomeScreen');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.content}>
      <Image source={SPLASH.logo} style={styles.image} />
      <Text style={styles.text}>adminbengkel.my.id</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightPurple,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
