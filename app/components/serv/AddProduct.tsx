// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';
import {color} from '../../constant/theme';
import {IServ} from '../../model/Serv';
import {PartDetail} from '../../screens/interface';
import Form from '../form/Form';

interface IDropdown {
  label: string;
  value: string;
}
interface AddProductProps {
  visible: boolean;
  parts: PartDetail[];
  servs: IServ[];
  onAdd: (servId: string, partId: string, productType: string) => boolean;
  onClose: () => void;
}

const AddProduct: FC<AddProductProps> = ({
  onClose,
  onAdd,
  visible,
  parts,
  servs,
}) => {
  const partsRef = useRef<PartDetail[]>([]);
  const [openProductType, setOpenProductType] = useState(false);
  const [valueProductType, setValueProductType] = useState('');
  const [productTypeItems, setProductTypeItems] = useState<IDropdown[]>([
    {label: 'JASA SERVIS', value: '1'},
    {label: 'SPARE PART', value: '2'},
  ]);
  const [openParts, setOpenParts] = useState(false);
  const [valueParts, setValueParts] = useState('');
  const [partsItems, setPartsItems] = useState<IDropdown[]>([]);

  const [openServs, setOpenServs] = useState(false);
  const [valueServs, setValueServs] = useState('');
  const [servsItems, setServsItems] = useState<IDropdown[]>([]);

  useEffect(() => {
    partsRef.current = parts;
    setPartsItems(
      parts.map(c => {
        const label = `${c.name} - ${c.code} (${formatNumber(c.price, {
          prefix: 'Rp',
          delimiter: ',',
          signPosition: 'beforePrefix',
        })})`;
        const value = c.id!;
        return {label, value};
      }),
    );
    setServsItems(
      servs.map(c => {
        const label = `${c.name} - ${formatNumber(c.price, {
          prefix: 'Rp',
          delimiter: ',',
          signPosition: 'beforePrefix',
        })}`;
        const value = c.id!;
        return {label, value};
      }),
    );
  }, [parts, servs]);

  const handleOnAdd = () => {
    const add = onAdd(valueServs, valueParts, valueProductType);
    if (add) {
      setValueProductType('');
      setValueParts('');
      setValueServs('');
      const _parts = partsRef.current.filter(s => s.id !== valueParts);
      partsRef.current = _parts;
      setPartsItems(
        _parts.map(c => {
          const label = `${c.name} - ${c.code} (${formatNumber(c.price, {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          })})`;
          const value = c.id!;
          return {label, value};
        }),
      );
    }
  };

  const TypePart = (
    <View>
      <DropDownPicker
        open={openParts}
        value={valueParts}
        items={partsItems}
        setOpen={setOpenParts}
        setValue={setValueParts}
        setItems={setPartsItems}
        placeholder={'Sparepart'}
        style={styles.dropdownServ}
        labelStyle={styles.labelServ}
        placeholderStyle={styles.placeholderServ}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Sparepart sudah digunakan/masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama part',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
      <Text style={styles.dropdownServText}>Pilih Sparepart</Text>
    </View>
  );
  const TypeServ = (
    <View>
      <DropDownPicker
        open={openServs}
        value={valueServs}
        items={servsItems}
        setOpen={setOpenServs}
        setValue={setValueServs}
        setItems={setServsItems}
        placeholder={'Jasa Servis'}
        style={styles.dropdownServ}
        labelStyle={styles.labelServ}
        placeholderStyle={styles.placeholderServ}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Jasa Servis masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama jasa',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
      <Text style={styles.dropdownServText}>Pilih Jasa Servis</Text>
    </View>
  );
  return (
    <Form
      iosIcon="cart"
      onClose={onClose}
      visible={visible}
      title="Tambah Produk">
      <View style={styles.addProductContent}>
        <View>
          <DropDownPicker
            open={openProductType}
            value={valueProductType}
            items={productTypeItems}
            setOpen={setOpenProductType}
            setValue={setValueProductType}
            setItems={setProductTypeItems}
            placeholder={'Tipe Produk'}
            style={styles.dropdownServ}
            labelStyle={styles.labelServ}
            placeholderStyle={styles.placeholderServ}
            listMessageTextStyle={{color: color.black}}
            listMode="MODAL"
          />
          <Text style={styles.dropdownServText}>Pilih Tipe Produk</Text>
        </View>
        {valueProductType === '1' ? TypeServ : null}
        {valueProductType === '2' ? TypePart : null}
        <View style={styles.actionContent}>
          <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
            <Text style={{color: color.white}}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave} onPress={handleOnAdd}>
            <Text style={{color: color.white}}>Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Form>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  addProductContent: {marginVertical: 10},
  dropdownServ: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 10,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownServText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: -8,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelServ: {color: color.darkGray, fontSize: 16},
  placeholderServ: {fontSize: 16, color: color.gray},
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
