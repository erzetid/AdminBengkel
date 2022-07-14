// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {StyleSheet, View} from 'react-native';

interface AdsProps {
  children?: JSX.Element | JSX.Element[];
}

export const Ads = ({children}: AdsProps) => {
  return <View style={styles.content}>{children}</View>;
};

export default Ads;

const styles = StyleSheet.create({
  content: {
    minHeight: 80,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
