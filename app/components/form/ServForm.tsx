// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {CategoryServ} from '../../constant/enum';
import {color} from '../../constant/theme';
import {generateServCode} from '../../helpers';
import {emptyServ, IServ} from '../../model/Serv';
import Form from './Form';

interface ServFormProps {
  title: string;
  visible: boolean;
  data: IServ;
  onClose: () => void;
  onSave: (s: IServ) => void;
}

const ServForm: FC<ServFormProps> = ({
  visible,
  title,
  data,
  onClose,
  onSave,
}) => {
  const isVisible = useMemo(() => visible, [visible]);
  const tileText = useMemo(() => title, [title]);
  const error: Array<keyof IServ> = useMemo(
    () => ['name', 'price', 'processTime'],
    [],
  );
  const [serv, setServ] = useState<IServ>(emptyServ);
  const [openCategory, setOpenCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState(CategoryServ.REGULAR);
  const [servCategory, setServCategory] = useState<
    {
      label: string;
      value: CategoryServ;
    }[]
  >([
    {label: 'Reguler', value: CategoryServ.REGULAR},
    {label: 'Penggantian Part', value: CategoryServ.LIGHT_REPAIR},
    {label: 'Ganti Oli', value: CategoryServ.OIL_REPLACEMENT},
    {label: 'Turun Mesin', value: CategoryServ.HEAVY_REPAIR},
  ]);
  const [isValidate, setIsValidate] = useState(false);
  const validation = useCallback(() => {
    error.map(e => {
      if (!serv[e]) {
        setIsValidate(false);
      } else {
        setIsValidate(true);
      }
    });
    if (serv?.code === '' && tileText === 'Edit Jasa Servis') {
      setIsValidate(false);
    }
  }, [error, serv, tileText]);
  useEffect(() => validation(), [validation]);
  useEffect(() => {
    setServ(data);
    setValueCategory(data.category);
  }, [data]);

  const handleOnSave = useCallback(() => {
    const _serv: IServ = {
      ...serv,
      code: tileText === 'Edit Jasa Servis' ? serv?.code : generateServCode(),
      category: valueCategory,
      time: Date.now(),
    };
    onSave(_serv);
  }, [onSave, serv, tileText, valueCategory]);
  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOnChangeText = useCallback(
    (value: string | number, field: keyof IServ) => {
      const _serv = {...serv, [field]: value};
      setServ(_serv);
    },
    [serv],
  );

  return (
    <Form
      iosIcon="bicycle"
      onClose={handleOnClose}
      title={tileText}
      visible={isVisible}>
      <View style={styles.content}>
        <View>
          <DropDownPicker
            open={openCategory}
            value={valueCategory}
            items={servCategory}
            setOpen={setOpenCategory}
            setValue={setValueCategory}
            setItems={setServCategory}
            placeholder={'Pilih kategori Pekerjaan'}
            style={styles.dropdownCategory}
            labelStyle={styles.labelCategory}
            placeholderStyle={styles.placeholderCategory}
            listMode="SCROLLVIEW"
          />
          <Text style={styles.dropdownCategoryText}>Kategori Pekerjaan</Text>
        </View>
        <OutlinedTextField
          label={'Nama Pekerjaan'}
          value={serv?.name}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          onChangeText={text => handleOnChangeText(text, 'name')}
          error={serv?.name ? '' : 'Harus diisi!'}
          onBlur={validation}
          maxLength={26}
          characterRestriction={26}
        />
        {tileText === 'Edit Jasa Servis' ? (
          <OutlinedTextField
            label={'Kode Pekerjaan'}
            value={serv?.code}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            maxLength={50}
            onChangeText={text => handleOnChangeText(text, 'code')}
            error={serv?.code ? '' : 'Harus diisi!'}
            onBlur={validation}
          />
        ) : null}
        <OutlinedTextField
          label={'Deskripsi Pekerjaan'}
          value={serv?.description}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          maxLength={50}
          characterRestriction={50}
          onChangeText={text => handleOnChangeText(text, 'description')}
        />
        <View style={styles.twoInput}>
          <OutlinedTextField
            label={'Harga'}
            value={serv?.price.toString()}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputLeft}
            keyboardType="number-pad"
            maxLength={12}
            onChangeText={text => {
              if (text.length < 1) {
                handleOnChangeText(0, 'price');
              } else {
                handleOnChangeText(parseFloat(text), 'price');
              }
            }}
            error={serv?.price ? '' : 'Harus diisi!'}
            onBlur={validation}
          />
          <OutlinedTextField
            label={'Waktu (menit)'}
            value={serv?.processTime.toString()}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputRight}
            keyboardType="number-pad"
            maxLength={12}
            onChangeText={text => {
              if (text.length < 1) {
                handleOnChangeText(0, 'processTime');
              } else {
                handleOnChangeText(parseFloat(text), 'processTime');
              }
            }}
            error={serv?.processTime ? '' : 'Harus diisi!'}
            onBlur={validation}
          />
        </View>
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
      </View>
    </Form>
  );
};

export default ServForm;

const styles = StyleSheet.create({
  content: {flex: 1, marginVertical: 10},
  dropdownCategory: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 10,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownCategoryText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: -8,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelCategory: {color: color.darkGray, fontSize: 16},
  placeholderCategory: {fontSize: 16, color: color.gray},
  twoInput: {flexDirection: 'row'},
  inputRight: {flexGrow: 1, marginStart: 5, flex: 1},
  inputLeft: {flexGrow: 1, marginEnd: 5, flex: 1},
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
