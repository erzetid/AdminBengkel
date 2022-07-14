// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {forwardRef, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {ICON} from '../../../assets/icon/index';
import {color} from '../../../constant/theme';
import {emptyWorkshop, IWorkshop} from '../../../model/Workshop';
import BackdropBS from '../../BackdropBS';

interface SettingProps {
  workshop?: IWorkshop;
  onPress: (ws: IWorkshop) => void;
}

const Setting = forwardRef<BottomSheetModal, SettingProps>(
  ({workshop = emptyWorkshop, onPress}, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const ws = useMemo(() => workshop, [workshop]);
    const [wsValue, setWsValue] = useState(workshop);

    useEffect(() => {
      setWsValue(ws);
    }, [ws]);

    const handleOnChange = (text: string, field: keyof IWorkshop) => {
      const _wsValue = {...wsValue};
      setWsValue({..._wsValue, [field]: text});
    };

    const handleOnPressUpdate = () => {
      onPress(wsValue);
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        style={styles.content}>
        <BottomSheetScrollView>
          <View style={styles.headerContent}>
            <View style={styles.imageText}>
              <View style={styles.imageTextContent}>
                <Text style={styles.textIdTitle}>ID : {wsValue.code}</Text>
                <Text style={styles.textIdInfo}>
                  ID ini bisa digunakan di semua perangkat smartphone dan ID ini
                  berfungsi sebagai kode akses untuk mencadangkan dan memulihkan
                  SEMUA data bengkel.
                  <Text style={styles.textIdInfoWarn}>
                    {' '}
                    ID INI BERSIFAT RAHASIA!
                  </Text>
                </Text>
              </View>
              <Image source={ICON.moto} style={styles.imageLogo} />
            </View>
          </View>
          <View>
            <Text style={styles.textInfo}>Data Bengkel</Text>
            <OutlinedTextField
              label={'Nama Bengkel'}
              value={wsValue.name}
              onChangeText={t => handleOnChange(t, 'name')}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              maxLength={50}
              characterRestriction={50}
            />
            <OutlinedTextField
              label={'Pemilik Bengkel'}
              value={wsValue.owner}
              onChangeText={t => handleOnChange(t, 'owner')}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              maxLength={35}
              characterRestriction={35}
            />
            <OutlinedTextField
              label={'Alamat Bengkel'}
              value={wsValue.address}
              onChangeText={t => handleOnChange(t, 'address')}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              multiline={true}
              maxLength={35}
              characterRestriction={50}
            />
            <OutlinedTextField
              label={'Deskripsi Bengkel'}
              value={wsValue.description}
              onChangeText={t => handleOnChange(t, 'description')}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              multiline={true}
              maxLength={35}
              characterRestriction={50}
            />
            <TouchableOpacity
              style={styles.btnUpdate}
              onPress={handleOnPressUpdate}>
              <Text style={styles.btnText}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

export default Setting;

const styles = StyleSheet.create({
  content: {flex: 1, padding: 10},
  headerContent: {
    borderRadius: 5,
    borderColor: color.lightPurple,
    borderWidth: 1,
    padding: 10,
  },
  imageText: {flexDirection: 'row', alignItems: 'center'},
  imageTextContent: {flexShrink: 1},
  imageLogo: {alignSelf: 'center', height: 70, width: 70, marginStart: 10},
  textIdTitle: {
    color: color.lightPurple,
    fontSize: 20,
    textAlign: 'center',
  },
  textIdInfo: {color: color.darkGray, fontSize: 12, textAlign: 'justify'},
  textIdInfoWarn: {color: color.red},
  textInfo: {marginTop: 10, fontSize: 16, color: color.black},
  fieldContent: {marginTop: 10},
  btnUpdate: {
    backgroundColor: color.lightPurple,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  btnText: {color: color.white},
});
