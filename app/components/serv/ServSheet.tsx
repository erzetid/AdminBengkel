// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {color} from '../../constant/theme';
import {IServ} from '../../model/Serv';
import ServForm from '../form/ServForm';
import SearchBar from '../SearchBar';
import ServList from './ServList';

interface ServSheetProps {
  data: IServ[];
  visible: boolean;
  serv: IServ;
  titleForm: string;
  onAdd: (s: IServ) => void;
  onPress: () => void;
  onCancel: () => void;
  onDelete: (s: IServ) => void;
  onUpdate: (s: IServ) => void;
  onFocus: () => void;
  onChangeText: (t: string) => void;
}

const ServSheet = forwardRef<BottomSheetModal, ServSheetProps>(
  (
    {
      onAdd,
      onPress,
      onCancel,
      onDelete,
      onUpdate,
      onFocus,
      onChangeText,
      data,
      visible,
      serv,
      titleForm,
    },
    ref,
  ) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const visibleForm = useMemo(() => visible, [visible]);

    const handleOnSearchFocus = useCallback(() => {
      onFocus();
    }, [onFocus]);
    const servsList = useMemo(
      () => <ServList onDelete={onDelete} onUpdate={onUpdate} servs={data} />,
      [onDelete, onUpdate, data],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        style={styles.content}>
        <Text style={styles.textTitle}>DATA JASA SERVIS</Text>
        <SearchBar
          title={'Cari kode/nama pekerjaan'}
          icon={'add'}
          onFocus={handleOnSearchFocus}
          onPress={onPress}
          onChangeText={onChangeText}
        />
        {servsList}
        <ServForm
          visible={visibleForm}
          onClose={onCancel}
          onSave={onAdd}
          title={titleForm}
          data={serv}
        />
      </BottomSheetModal>
    );
  },
);

export default ServSheet;

const styles = StyleSheet.create({
  content: {flex: 1, padding: 10},
  textTitle: {color: color.black, fontSize: 16, textAlign: 'center'},
});
