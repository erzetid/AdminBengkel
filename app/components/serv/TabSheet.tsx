// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {forwardRef, ReactNode, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../constant/theme';
import {IWorkOrder} from '../../model/Serv';

interface TabSheetProps {
  children?: ReactNode;
  data?: IWorkOrder;
  textBtn: string;
  onQueue: () => void;
  onProgress: () => void;
}

const TabSheet = forwardRef<BottomSheetModal, TabSheetProps>(
  ({children, data, textBtn, onQueue, onProgress}, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        style={styles.content}>
        <Text style={styles.textQueue}>{data?.queue}</Text>
        <Text style={styles.textPlate}>{data?.vehicle.plate}</Text>
        <BottomSheetScrollView>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Tanggal Daftar</Text>
            <Text style={styles.textValue}>
              :{' '}
              {formatDate(data?.time || 0, 'dd LLLL yyyy HH:mm', {
                locale: id,
              })}
            </Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>No Pendaftaran</Text>
            <Text style={styles.textValue}>
              : {`${data?.queue}${data?.time}`}
            </Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Nama Konsumen</Text>
            <Text style={styles.textValue}>: {data?.customer.name}</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Telepon/WA</Text>
            <Text style={styles.textValue}>: +62{data?.customer.phone}</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Kilometer </Text>
            <Text style={styles.textValue}>: {data?.kilometer}</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Keluhan </Text>
            <Text style={styles.textValue}>: {data?.complaint}</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.textTitle}>Analisa </Text>
            <Text style={styles.textValue}>: {data?.analysis}</Text>
          </View>
          {children}
          <TouchableOpacity
            style={styles.btnSheet}
            onPress={textBtn === 'MULAI SERVIS' ? onQueue : onProgress}>
            <Text style={styles.btnText}>{textBtn}</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

export default TabSheet;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  detailContent: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  textPlate: {
    color: color.black,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  textQueue: {
    backgroundColor: color.red,
    alignSelf: 'flex-end',
    color: color.white,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  textTitle: {width: '30%', color: color.black},
  textValue: {
    color: color.darkGray,
    flexWrap: 'wrap',
    flex: 1,
  },
  btnSheet: {
    backgroundColor: color.lightPurple,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  btnText: {color: color.white},
});
