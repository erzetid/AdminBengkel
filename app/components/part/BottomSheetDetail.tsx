// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ICON} from '../../assets/icon';
import {color} from '../../constant/theme';
import {BottomSheetDetailProps} from '../../screens/interface';
import BackdropBS from '../BackdropBS';

const emptyDetail = {
  id: 0,
  name: '',
  code: '',
  category: '',
  description: '',
  quantity: 0,
  price: 0,
  image: ICON.sparePart,
  location: '',
};
const BottomSheetDetail = forwardRef<BottomSheetModal, BottomSheetDetailProps>(
  ({detail = emptyDetail}, ref) => {
    const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        style={styles.content}>
        <Text style={{color: color.darkGray}}>{detail.name}</Text>
      </BottomSheetModal>
    );
  },
);

export default BottomSheetDetail;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
});
