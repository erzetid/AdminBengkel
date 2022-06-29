// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import VehicleForm from '../components/form/VehicleForm';
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import VehicleList from '../components/vehicle/VehicleList';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {IVehicle, Vehicle} from '../model/Vehicle';
import {AwesomeAlertProps, VehicleScreenProps} from './interface';

const VehicleScreen: FC<VehicleScreenProps> = ({navigation}) => {
  const vehicleService = useMemo(() => LocalDB.vehicles, []);
  const vehicleRef = useRef<Vehicle[]>([]);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);

  const [search, setSearch] = useState('');
  const [titleForm, setTitleForm] = useState('Tambah Kendaraan');
  const [visibleForm, setVisibleForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [value, setValue] = useState<IVehicle | null>(null);

  useEffect(() => {
    const init = async () => {
      getVehicles();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  const hideAlert = useCallback(() => {
    setOptionAlert({...optionAlertRef.current, show: false, progress: false});
  }, []);

  const loadAlert = useCallback((message: string = 'Mohon tunggu...') => {
    setOptionAlert({
      ...optionAlertRef.current,
      progress: true,
      show: true,
      title: message,
      message: '',
      buttonCancelShow: false,
      buttonConfirmShow: false,
    });
  }, []);

  const confirmAlert = useCallback(
    (
      {
        title = 'Admin Bengkel',
        message,
      }: {
        title?: string;
        message: string;
      },
      buttonCancelFunction: () => void,
      buttonConfirmFunction: () => void,
    ) => {
      setOptionAlert({
        ...optionAlertRef.current,
        show: true,
        title,
        message,
        buttonConfirmText: 'Ya, lanjutkan',
        buttonCancelText: 'Tidak, batal',
        buttonCancelColor: '#D0D0D0',
        buttonConfirmColor: color.red,
        buttonConfirmShow: true,
        buttonCancelShow: true,
        buttonCancelFunction,
        buttonConfirmFunction,
      });
    },
    [],
  );

  const statusAlert = useCallback(
    (message: string, status: ResultStatus) => {
      setOptionAlert({
        ...optionAlertRef.current,
        progress: false,
        show: true,
        title: status,
        message: message,
        buttonCancelColor:
          status === ResultStatus.SUCCESS ? color.green : color.red,
        buttonCancelShow: true,
        buttonConfirmShow: false,
        buttonCancelText: 'Tutup',
        buttonCancelFunction: hideAlert,
      });
    },
    [hideAlert],
  );

  const getVehicles = useCallback(async () => {
    const vs = await vehicleService.getAll();
    vehicleRef.current = vs;
    setVehicles(vs);
  }, [vehicleService]);

  const handleOnFocus = () => {};
  const handleVehicleForm = useCallback(async () => {
    setTitleForm('Tambah Kendaraan');
    setVisibleForm(true);
    setValue(null);
  }, []);
  const handleOnAdd = async (v: Vehicle) => {
    loadAlert();
    try {
      const saving = await vehicleService.create(v);
      statusAlert(saving.message, saving.status);
      if (saving.status === ResultStatus.SUCCESS) {
        setVisibleForm(false);
        await getVehicles();
      }
    } catch (e) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };
  const handleCancel = useCallback(async () => {
    setVisibleForm(false);
  }, []);

  const handleOnDeletePress = useCallback(
    async (v: Vehicle) => {
      loadAlert();
      try {
        const deleting = await vehicleService.delete(v.id!);
        statusAlert(deleting.message, deleting.status);
        if (deleting.status === ResultStatus.SUCCESS) {
          await getVehicles();
        }
      } catch (e) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [getVehicles, loadAlert, statusAlert, vehicleService],
  );

  const handleOnDelete = useCallback(
    (v: Vehicle) => {
      confirmAlert(
        {message: 'Apakah kamu yakin akan menghapus kendaraan ini?'},
        () => hideAlert(),
        () => handleOnDeletePress(v),
      );
    },
    [confirmAlert, handleOnDeletePress, hideAlert],
  );
  const handleUpdateVehicleForm = useCallback((v: Vehicle) => {
    setValue({...v});
    setTitleForm('Edit Kendaraan');
    setVisibleForm(true);
  }, []);
  const handleOnUpdate = useCallback(
    async (v: Vehicle) => {
      loadAlert();
      try {
        const updating = await vehicleService.update(v.id!, v);
        statusAlert(updating.message, updating.status);
        if (updating.status === ResultStatus.SUCCESS) {
          setVisibleForm(false);
          await getVehicles();
        }
      } catch (e) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [getVehicles, loadAlert, statusAlert, vehicleService],
  );

  const searchingVehicles = useCallback((text: string) => {
    const _vehicles = vehicleRef.current;
    if (text.length < 1) {
      return setVehicles(_vehicles);
    }
    const result = _vehicles.filter(
      (item: Vehicle) =>
        item.plate.toLowerCase().includes(text.toLowerCase()) ||
        item.registrationNumber.toLowerCase().includes(text.toLowerCase()),
    );
    setVehicles(result || []);
  }, []);

  const searchBarElement = useMemo(
    () => (
      <SearchBar
        title={'Cari no plat/no mesin'}
        value={search}
        icon={'add'}
        onPress={handleVehicleForm}
        onFocus={handleOnFocus}
        onChangeText={t => {
          setSearch(t);
          searchingVehicles(t);
        }}
      />
    ),
    [handleVehicleForm, search, searchingVehicles],
  );
  return (
    <SecondBackground>
      <SecondHeader title="Kendaraan" navigation={navigation} />
      {searchBarElement}
      <View style={styles.content}>
        <VehicleList
          vehicles={vehicles.sort((a, b) => {
            if (a.time < b.time) {
              return 1;
            }
            if (a.time > b.time) {
              return -1;
            }
            return 0;
          })}
          onDelete={handleOnDelete}
          onUpdate={handleUpdateVehicleForm}
        />
      </View>
      <VehicleForm
        onCancel={handleCancel}
        initial={value}
        onSave={titleForm === 'Tambah Kendaraan' ? handleOnAdd : handleOnUpdate}
        title={titleForm}
        visible={visibleForm}
      />
      <AlertCustom option={optionAlert} />
    </SecondBackground>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: color.white,
    borderRadius: 5,
    flex: 1,
  },
});
