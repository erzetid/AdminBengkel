// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {color} from '../../constant/theme';
import {ICustomer} from '../../model/Customer';
import Form from './Form';

interface CustomerFormProps {
  value: ICustomer;
  visible: boolean;
  title: string;
  onClose: () => void;
  onSave: (value: ICustomer) => void;
}

const CustomerForm: FC<CustomerFormProps> = ({
  value,
  visible,
  title,
  onClose,
  onSave,
}) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [error, setError] = useState({name: '', phone: '', address: ''});
  useEffect(() => {
    setCustomer(value);
    validation(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const isVisible = useMemo(() => visible, [visible]);
  const titleText = useMemo(() => title, [title]);

  const handleOnClose = useCallback(() => onClose(), [onClose]);
  const handleOnSave = useCallback(() => {
    const _costumer = {
      ...customer!,
      time: Date.now(),
    };
    onSave(_costumer);
  }, [customer, onSave]);

  const validation = useCallback(
    (obj: any) => {
      onValidation(obj);
      let _error = {...error};
      for (const key in obj) {
        if (!obj[key] || obj[key] === '0') {
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
      if (!obj[key] || obj[key] === '0') {
        return setIsValidate(false);
      }
    }
    return setIsValidate(true);
  };

  const onChangeText = useCallback(
    (text: string, field: keyof ICustomer) => {
      const _customer = {
        ...customer!,
        [field]: text,
      };
      const {name, phone, address} = _customer;
      setCustomer(_customer);
      validation({name, phone, address});
    },
    [customer, validation],
  );
  const buttonAction = useMemo(
    () => (
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
    ),
    [handleOnClose, handleOnSave, isValidate],
  );

  return (
    <Form
      visible={isVisible}
      title={titleText}
      iosIcon="create"
      onClose={handleOnClose}>
      <OutlinedTextField
        label={'Nama Konsumen'}
        value={customer?.name}
        tintColor={color.lightPurple}
        textColor={color.darkGray}
        containerStyle={styles.fieldContent}
        onChangeText={text => onChangeText(text, 'name')}
        error={error.name}
      />
      <View style={styles.fieldContent}>
        <Text style={styles.textPhone}>+62</Text>
        <OutlinedTextField
          label={'Nomor Whatsapp'}
          value={customer?.phone}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{paddingStart: 35}}
          // eslint-disable-next-line react-native/no-inline-styles
          labelTextStyle={{left: phoneFocus || customer?.phone ? -30 : 0}}
          keyboardType="number-pad"
          onFocus={() => {
            setPhoneFocus(true);
          }}
          onBlur={() => {
            setPhoneFocus(false);
          }}
          onChangeText={text => {
            if (text.length < 1) {
              text = '0';
            }
            const _text = parseInt(text, 10);
            onChangeText(_text.toString(), 'phone');
          }}
          error={error.phone}
        />
      </View>
      <OutlinedTextField
        label={'Alamat Konsumen'}
        value={customer?.address}
        tintColor={color.lightPurple}
        textColor={color.darkGray}
        containerStyle={styles.fieldContent}
        onChangeText={text => onChangeText(text, 'address')}
        error={error.address}
      />
      {buttonAction}
    </Form>
  );
};

export default CustomerForm;

const styles = StyleSheet.create({
  textPhone: {
    color: color.darkGray,
    position: 'absolute',
    left: 5,
    top: 16,
    fontSize: 16,
  },
  fieldContent: {marginTop: 10},
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
