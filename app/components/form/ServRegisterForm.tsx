// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../constant/theme';
import {ICustomer} from '../../model/Customer';
import {IWorkOrder} from '../../model/Serv';
import {IVehicle} from '../../model/Vehicle';
import Form from './Form';

interface ServRegisterForm {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSave: (wo: IWorkOrder) => void;
}

const ServRegisterForm: FC<ServRegisterForm> = ({
  visible,
  title,
  onClose,
  onSave,
}) => {
  const defaultCustomer: ICustomer = useMemo(() => {
    return {
      address: 'Brebes',
      name: 'Joko Sembung',
      no: '22121',
      phone: '8956565',
      id: '1',
    };
  }, []);
  const defaultVehicle: IVehicle = useMemo(() => {
    return {
      brand: 'Honda',
      model: 'Mio',
      plate: 'H6665LP',
      registrationNumber: 'JKAMD6466',
      year: 2020,
    };
  }, []);
  const defaultMechanic = useMemo(() => 'Tidak ada mekanik', []);
  const isVisible = useMemo(() => visible, [visible]);
  const tileText = useMemo(() => title, [title]);

  const [isValidate, setIsValidate] = useState(true);
  const handleOnSave = useCallback(() => {
    onSave({
      analysis: 'Cek busi',
      complaint: 'Tarikan berat, rem kurang pakem',
      customer: defaultCustomer,
      doneTime: Date.now(),
      mechanic: defaultMechanic,
      part: [],
      queue: 'S001',
      serv: [],
      startTime: Date.now(),
      time: Date.now(),
      vehicle: defaultVehicle,
    });
  }, [defaultCustomer, defaultVehicle, defaultMechanic, onSave]);
  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <Form
      iosIcon="bicycle"
      onClose={handleOnClose}
      title={tileText}
      visible={isVisible}>
      <View style={styles.actionContent}>
        <TouchableOpacity style={styles.btnCancel} onPress={handleOnClose}>
          <Text style={{color: color.white}}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isValidate ? styles.btnSave : styles.btnCancel}
          onPress={handleOnSave}
          disabled={!isValidate}>
          <Text style={{color: color.white}}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default ServRegisterForm;

const styles = StyleSheet.create({
  actionContent: {flexDirection: 'row', justifyContent: 'space-between'},
  btnCancel: {
    backgroundColor: color.gray,
    minHeight: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48.5%',
  },
  btnSave: {
    backgroundColor: color.lightPurple,
    minHeight: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48.5%',
  },
});
