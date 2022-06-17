// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {color} from '../constant/theme';

const BackdropBS = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  Animated.timing(fadeAnim, {
    toValue: 0.5,
    duration: 350,
    useNativeDriver: false,
  }).start();

  return <Animated.View style={{...styles.content, opacity: fadeAnim}} />;
};

export default BackdropBS;
const styles = StyleSheet.create({
  content: {
    backgroundColor: color.black,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
