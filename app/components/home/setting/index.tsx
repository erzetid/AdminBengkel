// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {forwardRef, useEffect, useMemo, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {SPLASH} from '../../../assets/images/index';
import {color} from '../../../constant/theme';
import {IWorkshop} from '../../../model/Workshop';
import BackdropBS from '../../BackdropBS';

interface SettingProps {
  workshop: IWorkshop;
  onPress: (ws: IWorkshop) => void;
}

const Setting = forwardRef<BottomSheetModal, SettingProps>(
  ({workshop, onPress}, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const ws = useRef<IWorkshop>(workshop);

    useEffect(() => {
      ws.current = workshop;
    }, [workshop]);

    const handleOnChange = (text: string, field: keyof IWorkshop) => {
      const _ws = {...ws.current, [field]: text};
      ws.current = _ws;
    };

    const handleOnPressUpdate = () => {
      onPress(ws.current);
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
                <Text style={styles.textIdTitle}>ID : {ws.current.code}</Text>
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
              <Image source={SPLASH.logo} style={styles.imageLogo} />
            </View>
          </View>
          <View>
            <Text style={styles.textInfo}>Data Bengkel</Text>
            <OutlinedTextField
              label={'Nama Bengkel'}
              defaultValue={ws.current.name}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              maxLength={50}
              characterRestriction={50}
              onChangeText={t => handleOnChange(t, 'name')}
            />
            <OutlinedTextField
              label={'Pemilik Bengkel'}
              defaultValue={ws.current.owner}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              maxLength={35}
              characterRestriction={35}
              onChangeText={t => handleOnChange(t, 'owner')}
            />
            <OutlinedTextField
              label={'Alamat Bengkel'}
              defaultValue={ws.current.address}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              multiline={true}
              maxLength={50}
              characterRestriction={50}
              onChangeText={t => handleOnChange(t, 'address')}
            />
            <OutlinedTextField
              label={'Deskripsi Bengkel'}
              defaultValue={ws.current.description}
              tintColor={color.lightPurple}
              textColor={color.darkGray}
              containerStyle={styles.fieldContent}
              multiline={true}
              maxLength={80}
              characterRestriction={80}
              onChangeText={t => handleOnChange(t, 'description')}
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
  textIdInfo: {color: color.darkGray, fontSize: 12, textAlign: 'center'},
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
