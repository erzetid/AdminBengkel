// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../../../constant/theme';

interface AdsProps {
  children?: JSX.Element | JSX.Element[];
}

export const Ads = ({children}: AdsProps) => {
  return <View style={styles.content}>{children}</View>;
};

export default Ads;

const styles = StyleSheet.create({
  content: {
    backgroundColor: color.gray,
    minHeight: 80,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
