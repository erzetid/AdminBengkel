// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../../assets/icon';
import {ResultStatus} from '../../constant/enum';
import {color} from '../../constant/theme';
import LocalDB from '../../database';
import {filterArrayContain, greeting} from '../../helpers';
import {ICustomer} from '../../model/Customer';
import {IVehicle} from '../../model/Vehicle';
import BackdropBS from '../BackdropBS';

interface CustomerDetailProps {
  data: ICustomer;
  onPressEdit: (customr: ICustomer) => void;
  onPressDelete: (customr: ICustomer) => void;
}
const CustomerDetail = forwardRef<BottomSheetModal, CustomerDetailProps>(
  ({data, onPressEdit, onPressDelete}, ref) => {
    const [index, setIndex] = useState(0);
    const textWA =
      '*Nama Bengkel*%0A_Alamat Bengkel_%0A%0A' +
      greeting() +
      'Bapak/Ibu *' +
      data.name +
      '*%0ABerdasarkan data kami motor anda telah memasuki waktu servis dan ganti oli.%0A%0A' +
      '%0ATerima kasih%0A%0A';

    const vehicleService = useMemo(() => LocalDB.vehicles, []);
    const [snapPoints, setSnapPoints] = useState(['35%']);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [vehicle, setVehicle] = useState(null);
    const [openDropDownVehicle, setOpenDropDownVehicle] = useState(false);
    const [vehicleFocus, setVehicleFocus] = useState(false);
    const [customerVehicle, setCustomerVehicle] = useState<IVehicle[]>([]);

    useEffect(() => {
      const init = async () => {
        await getVehicle();
      };
      init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]);

    useEffect(() => {
      setIndex(snapPoints.length - 1);

      return () => {
        setIndex(0);
      };
    }, [snapPoints]);

    useEffect(() => {}, []);

    const getVehicle = async () => {
      const _vehicles = await vehicleService.getAll();
      const _customerVehicle = _vehicles.filter(v => v.owner === data.id);
      const vehiclesNoOwner = filterArrayContain(
        _vehicles,
        _customerVehicle,
        'id',
      );
      setVehicles(vehiclesNoOwner);
      setCustomerVehicle(_customerVehicle);
    };

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
    const handleOnPressVehicle = () => {
      const _snapPoints = ['35%', '50%', '70%', '100%'];
      setSnapPoints(_snapPoints);
      setVehicleFocus(true);
    };

    const handleOnDismiss = () => {
      setIndex(0);
      setSnapPoints(['35%']);
      setVehicleFocus(false);
      setOpenDropDownVehicle(false);
      setVehicle(null);
    };

    const handleOnAddVehicle = async () => {
      if (vehicle) {
        try {
          const _vehicle = await vehicleService.findById(vehicle);
          const update = await vehicleService.update(vehicle, {
            ..._vehicle.data!,
            owner: data.id,
            time: Date.now(),
          });
          if (update.status === ResultStatus.SUCCESS) {
            const _customerVehicle = [...customerVehicle];
            _customerVehicle.push(update.data!);
            const _vehicles = filterArrayContain(
              vehicles,
              _customerVehicle,
              'id',
            );
            setCustomerVehicle(_customerVehicle);
            setVehicles(_vehicles);
            setVehicle(null);
          }
        } catch (error) {}
      }
    };

    const handleOnDeleteVehicle = async (v: IVehicle) => {
      try {
        const _vehicles = [...vehicles];
        const _vehicle = await vehicleService.findById(v.id!);
        const update = await vehicleService.update(v.id!, {
          ..._vehicle.data!,
          owner: '',
          time: Date.now(),
        });
        if (update.status === ResultStatus.SUCCESS) {
          const _customerVehicle = [...customerVehicle];
          console.log(_customerVehicle);
          const i = _customerVehicle.indexOf(v);
          if (i > -1) {
            if (update.data) {
              _customerVehicle.splice(i, 1);
              _vehicles.push(v);
              setVehicles(_vehicles);
              setCustomerVehicle(_customerVehicle);
            }
          }
        }
      } catch (error) {}
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        onDismiss={handleOnDismiss}
        style={styles.content}>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {!vehicleFocus ? (
            <>
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
                  <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={handleOnDelete}>
                    <Text style={styles.textAction}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.actionContent}>
                <TouchableOpacity
                  style={{...styles.btnAction, backgroundColor: color.yellow}}
                  onPress={handleOnEdit}>
                  <Icon
                    name="ios-create-outline"
                    size={16}
                    color={color.white}
                  />
                  <Text style={styles.textAction}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.btnAction,
                    backgroundColor: color.lightBlue,
                  }}>
                  <Icon
                    name="ios-reload-outline"
                    size={16}
                    color={color.white}
                  />
                  <Text style={styles.textAction}>Riwayat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnAction, backgroundColor: color.red}}
                  onPress={handleOnPressVehicle}>
                  <Icon name="ios-bicycle" size={16} color={color.white} />
                  <Text style={styles.textAction}>Kendaraan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.btnAction,
                    backgroundColor: color.green,
                  }}
                  onPress={handleOnPressWA}>
                  <Icon
                    name="ios-logo-whatsapp"
                    size={16}
                    color={color.white}
                  />
                  <Text style={styles.textAction}>WA: Ingatkan Servis</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.btnAction,
                    backgroundColor: color.lightPurple,
                  }}>
                  <Icon name="ios-cart-outline" size={16} color={color.white} />
                  <Text style={styles.textAction}>Tambah Transaksi</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.vehicleContent}>
              <Text style={styles.textVehicle}>TAMBAH KENDARAAN KONSUMEN</Text>
              <Text style={styles.addInfo}>
                {'   '}Silahkan pilih kendaraan lalu klik tombol tambah untuk
                mengubah atau menambah kepemilikan kendaraan konsumen.
              </Text>
              <View style={styles.addVehicleContent}>
                <DropDownPicker
                  items={vehicles.map(v => ({
                    label: `${v.plate} - ${v.model}`,
                    value: v.id,
                  }))}
                  open={openDropDownVehicle}
                  setOpen={setOpenDropDownVehicle}
                  setValue={setVehicle}
                  value={vehicle}
                  min={300}
                  searchable={true}
                  searchPlaceholder="Cari..."
                  placeholder={'Pilih kendaraan'}
                  listMode="SCROLLVIEW"
                  containerStyle={styles.dropdown}
                />

                <TouchableOpacity
                  style={styles.btnAddVehicle}
                  onPress={handleOnAddVehicle}>
                  <Text style={styles.textAction}>Tambah</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textVehicle}>DATA KENDARAAN KONSUMEN</Text>
              <View style={styles.vehicleTableContent}>
                <View style={styles.vehicleDataContent}>
                  <Text style={styles.titlePlateVehicle}>No. Polisi</Text>
                  <Text style={styles.titleDetailVehicle}>Data Kendaraan</Text>
                  <Text style={styles.titleActionVehicle}>Aksi</Text>
                </View>
                {customerVehicle.length < 1 && (
                  <View style={styles.vehicleDataContent}>
                    <Text style={styles.fieldEmptyVehicle}>
                      Belum ada kendaraan.
                    </Text>
                  </View>
                )}
                {customerVehicle.map((v, i) => (
                  <View key={i} style={styles.vehicleDataContent}>
                    <Text style={styles.fieldPlateVehicle}>{v.plate}</Text>
                    <Text
                      style={
                        styles.fieldDetailVehicle
                      }>{`${v.brand} ${v.model}`}</Text>
                    <View style={styles.fieldActionVehicle}>
                      <TouchableOpacity
                        style={styles.actionDeleteVehicle}
                        onPress={() => handleOnDeleteVehicle(v)}>
                        <Icon name="ios-trash" color={color.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </BottomSheetScrollView>
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
    paddingBottom: 100,
    borderBottomColor: color.lightPurple,
    borderBottomWidth: 2,
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
  vehicleContent: {flex: 1, paddingBottom: 80},
  textVehicle: {color: color.black, fontSize: 16, textAlign: 'center'},
  vehicleDataContent: {
    flexDirection: 'row',
  },
  vehicleTableContent: {
    paddingVertical: 5,
  },
  addInfo: {color: color.darkGray, textAlign: 'justify'},
  titlePlateVehicle: {
    color: color.darkGray,
    backgroundColor: color.lightGray,
    width: '25%',
    textAlign: 'center',
    fontSize: 14,
    borderTopColor: color.gray,
    borderBottomColor: color.gray,
    borderLeftColor: color.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  titleDetailVehicle: {
    color: color.darkGray,
    backgroundColor: color.lightGray,
    width: '55%',
    textAlign: 'center',
    fontSize: 14,
    borderColor: color.gray,
    borderWidth: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  titleActionVehicle: {
    color: color.darkGray,
    backgroundColor: color.lightGray,
    width: '20%',
    textAlign: 'center',
    fontSize: 14,
    borderTopColor: color.gray,
    borderBottomColor: color.gray,
    borderRightColor: color.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  fieldPlateVehicle: {
    color: color.darkGray,
    width: '25%',
    textAlign: 'center',
    borderBottomColor: color.gray,
    borderLeftColor: color.gray,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  fieldDetailVehicle: {
    color: color.darkGray,
    width: '55%',
    textAlign: 'left',
    borderBottomColor: color.gray,
    borderLeftColor: color.gray,
    borderRightColor: color.gray,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  fieldActionVehicle: {
    width: '20%',
    borderBottomColor: color.gray,
    borderRightColor: color.gray,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  fieldEmptyVehicle: {
    color: color.darkGray,
    textAlign: 'center',
    borderBottomColor: color.gray,
    borderLeftColor: color.gray,
    borderRightColor: color.gray,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    width: '100%',
    paddingVertical: 10,
  },
  actionDeleteVehicle: {
    borderRadius: 5,
    backgroundColor: color.red,
    padding: 5,
    margin: 5,
  },
  addVehicleContent: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: color.lightPurple,
    borderBottomWidth: 2,
    zIndex: 100,
  },
  dropdown: {
    width: '70%',
    marginEnd: 5,
  },
  btnAddVehicle: {
    alignSelf: 'center',
    backgroundColor: color.green,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 1,
  },
});
