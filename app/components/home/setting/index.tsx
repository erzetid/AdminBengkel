// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {color} from '../../../constant/theme';
import BackdropBS from '../../BackdropBS';

interface SettingProps {}

const Setting = forwardRef<BottomSheetModal, SettingProps>(({}, ref) => {
  const snapPoints = useMemo(() => ['100%'], []);
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={BackdropBS}>
      <Text style={styles.textIdTitle}>ID BENGKEL: {`AB-${Date.now()}`}</Text>
      <Text style={styles.textIdInfo}>Oke</Text>
    </BottomSheetModal>
  );
});

export default Setting;

const styles = StyleSheet.create({
  textIdTitle: {
    color: color.black,
    textAlign: 'center',
    fontSize: 18,
  },
  textIdInfo: {},
});
