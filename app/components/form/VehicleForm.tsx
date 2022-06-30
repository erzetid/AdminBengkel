// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {text} from '../../constant/styles';
import {color} from '../../constant/theme';
import {IVehicle} from '../../model/Vehicle';
import Form from './Form';

interface VehicleFormProps {
  visible: boolean;
  title: string;
  initial: IVehicle | null;
  onSave: (vehicle: IVehicle) => void;
  onCancel: () => void;
  onValidate?: (isValidate: boolean) => void;
}
const VehicleForm: FC<VehicleFormProps> = ({
  visible,
  title,
  initial,
  onCancel,
  onSave,
}) => {
  const [isValidate, setIsValidate] = useState(false);
  const [vehicle, setVehicle] = useState({
    brand: '',
    model: '',
    plate: '',
    registrationNumber: '',
    year: 0,
  });
  const [error, setError] = useState({
    brand: 'Harus diisi.',
    model: 'Harus diisi.',
    plate: 'Harus diisi.',
    registrationNumber: 'Harus diisi.',
    year: 'Harus diisi.',
  });

  useEffect(() => {
    if (initial) {
      setVehicle({...initial});
      setError({
        brand: '',
        model: '',
        plate: '',
        registrationNumber: '',
        year: '',
      });
      setIsValidate(true);
    } else {
      setVehicle({
        brand: '',
        model: '',
        plate: '',
        registrationNumber: '',
        year: 0,
      });
      setError({
        brand: 'Harus diisi.',
        model: 'Harus diisi.',
        plate: 'Harus diisi.',
        registrationNumber: 'Harus diisi.',
        year: 'Harus diisi.',
      });
    }
  }, [initial]);

  const isVisible = useMemo(() => visible, [visible]);
  const handleOnSave = useCallback(() => {
    onSave({...vehicle, time: Date.now()});
  }, [onSave, vehicle]);
  const handleOnCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);
  const validation = useCallback(
    (obj: any) => {
      onValidation(obj);
      let _error = {...error};
      for (const key in obj) {
        if (!obj[key]) {
          _error = {..._error, [key]: 'Harus diisi.'};
        } else {
          _error = {..._error, [key]: ''};
        }
      }
      setError(_error);
    },
    [error],
  );

  const onValidation = (obj: any): void => {
    for (const key in obj) {
      if (!obj[key] && key !== 'owner') {
        return setIsValidate(false);
      }
    }
    return setIsValidate(true);
  };

  const handleOnChangeText = useCallback(
    (t: string | number, field: keyof typeof vehicle) => {
      const _vehicle = {...vehicle, [field]: t};

      setVehicle(_vehicle);
      onValidation(_vehicle);
      validation(_vehicle);
    },
    [validation, vehicle],
  );
  return (
    <Form
      iosIcon="create-outline"
      title={title}
      visible={isVisible}
      onClose={handleOnCancel}>
      <Text style={styles.textProcedure}>
        Mohon isi data kendaran dengan benar.
      </Text>
      <OutlinedTextField
        label={'No Plat'}
        tintColor={color.lightPurple}
        value={vehicle.plate}
        textColor={color.darkGray}
        maxLength={10}
        onChangeText={t => {
          handleOnChangeText(t.trim().toUpperCase(), 'plate');
        }}
        error={error.plate}
      />
      <OutlinedTextField
        label={'Merk/brand'}
        tintColor={color.lightPurple}
        value={vehicle.brand}
        textColor={color.darkGray}
        maxLength={10}
        onChangeText={t => {
          handleOnChangeText(t, 'brand');
        }}
        error={error.brand}
      />
      <OutlinedTextField
        label={'Tipe/model'}
        tintColor={color.lightPurple}
        value={vehicle.model}
        textColor={color.darkGray}
        maxLength={30}
        onChangeText={t => {
          handleOnChangeText(t, 'model');
        }}
        error={error.model}
      />
      <View style={styles.formContent}>
        <OutlinedTextField
          label={'Tahun Perakitan'}
          tintColor={color.lightPurple}
          value={(vehicle.year && vehicle.year.toString()) || '0'}
          textColor={color.darkGray}
          maxLength={4}
          containerStyle={styles.inputYear}
          keyboardType={'number-pad'}
          onChangeText={t => {
            handleOnChangeText(parseInt(t, 10), 'year');
          }}
          error={error.year}
        />
        <OutlinedTextField
          label={'No Mesin'}
          tintColor={color.lightPurple}
          value={vehicle.registrationNumber}
          textColor={color.darkGray}
          maxLength={30}
          containerStyle={styles.inputRegistrationNumber}
          onChangeText={t => {
            handleOnChangeText(t.trim().toUpperCase(), 'registrationNumber');
          }}
          error={error.registrationNumber}
        />
      </View>
      <View style={styles.btnContent}>
        <TouchableOpacity style={styles.btnCancel} onPress={handleOnCancel}>
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

export default VehicleForm;

const styles = StyleSheet.create({
  textProcedure: {...text.secondaryMedium, marginBottom: 10},
  formContent: {flexDirection: 'row'},
  inputYear: {flex: 1, marginEnd: 5, maxWidth: '40%'},
  inputRegistrationNumber: {flex: 1},
  btnContent: {flexDirection: 'row', justifyContent: 'space-between'},
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
