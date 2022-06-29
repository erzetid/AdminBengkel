// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../../assets/icon';
import {color} from '../../constant/theme';
import {greeting} from '../../helpers';
import {ICustomer} from '../../model/Customer';
import BackdropBS from '../BackdropBS';

interface CustomerDetailProps {
  data: ICustomer;
  onPressEdit: (customr: ICustomer) => void;
  onPressDelete: (customr: ICustomer) => void;
}

const CustomerDetail = forwardRef<BottomSheetModal, CustomerDetailProps>(
  ({data, onPressEdit, onPressDelete}, ref) => {
    const textWA =
      '*Nama Bengkel*%0A_Alamat Bengkel_%0A%0A' +
      greeting() +
      'Bapak/Ibu *' +
      data.name +
      '*%0ABerdasarkan data kami motor anda telah memasuki waktu servis dan ganti oli.%0A%0A' +
      '%0ATerima kasih%0A%0A';

    const snapPoints = useMemo(() => ['35%', '50%', '70%', '100%'], []);
    const handleOnEdit = useCallback(
      () => onPressEdit(data),
      [data, onPressEdit],
    );
    const handleOnDelete = useCallback(
      () => onPressDelete(data),
      [data, onPressDelete],
    );
    const handleOnPressWA = useCallback(
      () =>
        Linking.openURL(`whatsapp://send?text=${textWA}&phone=62${data.phone}`),
      [data.phone, textWA],
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        style={styles.content}>
        <View style={styles.detailContent}>
          <View style={styles.textContent}>
            <Text style={styles.textName}>{data.name}</Text>
            <View style={styles.dataContent}>
              <Text style={styles.textField}>No :</Text>
              <Text style={styles.textValue}>{data.no}</Text>
            </View>
            <View style={styles.dataContent}>
              <Text style={styles.textField}>Alamat :</Text>
              <Text style={styles.textValue}>{data.address}</Text>
            </View>
            <View style={styles.dataContent}>
              <Text style={styles.textField}>Telp/Hp :</Text>
              <Text style={styles.textValue}>{data.phone}</Text>
            </View>
          </View>
          <View style={styles.imageContent}>
            <Image source={ICON.customer} style={styles.image} />
            <TouchableOpacity style={styles.btnDelete} onPress={handleOnDelete}>
              <Text style={styles.textAction}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionContent}>
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.yellow}}
            onPress={handleOnEdit}>
            <Icon name="ios-create-outline" size={16} color={color.white} />
            <Text style={styles.textAction}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.lightBlue}}>
            <Icon name="ios-reload-outline" size={16} color={color.white} />
            <Text style={styles.textAction}>Riwayat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.red}}>
            <Icon name="ios-bicycle" size={16} color={color.white} />
            <Text style={styles.textAction}>Kendaraan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnAction,
              backgroundColor: color.green,
            }}
            onPress={handleOnPressWA}>
            <Icon name="ios-logo-whatsapp" size={16} color={color.white} />
            <Text style={styles.textAction}>WA: Ingatkan Servis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.lightPurple}}>
            <Icon name="ios-cart-outline" size={16} color={color.white} />
            <Text style={styles.textAction}>Tambah Transaksi</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    );
  },
);

export default CustomerDetail;

const styles = StyleSheet.create({
  content: {paddingHorizontal: 20, flex: 1},
  detailContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {flexGrow: 1, flexShrink: 1},
  imageContent: {justifyContent: 'center'},
  image: {width: 70, height: 70},
  btnDelete: {
    backgroundColor: color.gray,
    flexDirection: 'row',
    margin: 5,
    paddingHorizontal: 5,
    elevation: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {color: color.black, fontSize: 18, textAlign: 'center'},
  dataContent: {
    flexDirection: 'row',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    paddingVertical: 3,
  },
  textField: {color: color.darkGray, minWidth: 60, textAlign: 'right'},
  textValue: {
    color: color.yellow,
    flexGrow: 1,
    marginStart: 5,
    flexShrink: 1,
    textAlign: 'justify',
  },
  actionContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnAction: {
    padding: 5,
    minWidth: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    elevation: 1,
    marginTop: 10,
  },
  textAction: {color: color.white, marginStart: 3, fontSize: 16},
});
