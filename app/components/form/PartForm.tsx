// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {ICON} from '../../assets/icon/index';
import {Category, ImagePart} from '../../constant/enum';
import {color} from '../../constant/theme';
import {PartDetail} from '../../screens/interface';
import Form from './Form';

interface PartFormProps {
  visible: boolean;
  title: string;
  item?: PartDetail;
  onCancel: () => void;
  onSave: (part: PartDetail) => void;
}
DropDownPicker.setListMode('SCROLLVIEW');

const PartForm: FC<PartFormProps> = ({
  visible,
  title,
  item,
  onCancel,
  onSave,
}) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState(null);
  const [itemsCategory, setItemsCategory] = useState<
    {
      label: string;
      value: Category;
    }[]
  >([
    {label: 'Kelistrikan', value: Category.ELECTRICAL},
    {label: 'Mesin', value: Category.ENGINE},
    {label: 'Rangka', value: Category.FRAME},
  ]);
  const [openImage, setOpenImage] = useState(false);
  const [valueImage, setValueImage] = useState(null);
  const [itemsImage, setItemsImage] = useState<
    {
      label: string;
      value: keyof typeof ICON.PART;
    }[]
  >([
    {label: 'Default', value: ImagePart.DEFAULT},
    {label: 'Aki/baterai', value: ImagePart.BATTERY},
    {label: 'Air Radiotor', value: ImagePart.COOLANT},
    {label: 'Ban/Roda', value: ImagePart.TIRE},
    {label: 'Busi', value: ImagePart.SPARK_PLUG},
    {label: 'Lampu', value: ImagePart.LAMP},
    {label: 'Rantai Roda', value: ImagePart.GEAR_SET},
    {label: 'Rem', value: ImagePart.BRAKE},
    {label: 'Oli Gardan', value: ImagePart.GEAR_OIL},
    {label: 'Oli Mesin', value: ImagePart.OIL},
    {label: 'Van Belt', value: ImagePart.V_BELT},
  ]);
  const [name, setName] = useState<string>(item?.name || '');
  const [code, setCode] = useState<string>(item?.code || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState<number>(item?.price || 0);
  const [buyPrice, setBuyPrice] = useState<number>(item?.buyPrice || 0);
  const [quantity, setQuantity] = useState<number>(item?.quantity || 0);
  const [location, setLocation] = useState<string>(item?.location || '');
  const time = Date.now();
  const [error, setError] = useState({
    buyPrice: '',
    code: '',
    description: '',
    location: '',
    name: '',
    price: '',
    quantity: '',
    time: '',
  });

  const isVisible = useMemo(() => visible, [visible]);
  const handleOnSave = useCallback(() => {
    onSave({
      code,
      category: item
        ? item.category
        : valueCategory
        ? valueCategory
        : Category.FRAME,
      image: item ? item.image : valueImage ? valueImage : ImagePart.DEFAULT,
      buyPrice,
      description,
      location,
      name,
      price,
      quantity,
      time,
    });
  }, [
    buyPrice,
    code,
    description,
    item,
    location,
    name,
    onSave,
    price,
    quantity,
    time,
    valueCategory,
    valueImage,
  ]);

  const handleOnCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const buttonAction = useMemo(
    () => (
      <View style={styles.actionContent}>
        <TouchableOpacity style={styles.btnCancel} onPress={handleOnCancel}>
          <Text style={{color: color.white}}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSave} onPress={handleOnSave}>
          <Text style={{color: color.white}}>Simpan</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleOnSave, handleOnCancel],
  );
  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!item && !isVisible) {
      setName(null!);
      setCode(null!);
      setDescription(null!);
      setPrice(0);
      setBuyPrice(0);
      setQuantity(0);
      setLocation('');
      setValueCategory(null!);
      setValueImage(null!);
      setError({
        buyPrice: 'Harus diisi.',
        code: 'Harus diisi.',
        description: '',
        location: 'Harus diisi.',
        name: 'Harus diisi.',
        price: 'Harus diisi.',
        quantity: 'Harus diisi.',
        time: 'Harus diisi.',
      });
    }
  }, [isVisible, item]);

  const validation = () => {
    const obj: any = {
      code,
      category: valueCategory ? valueCategory : Category.FRAME,
      image: valueImage ? valueImage : ImagePart.DEFAULT,
      buyPrice,
      description,
      location,
      name,
      price,
      quantity,
      time,
    };
    let _error = {...error};
    for (const key in obj) {
      if (key !== 'category' && key !== 'image') {
        if (!obj[key]) {
          _error = {..._error, [key]: 'Harus diisi.'};
        } else {
          _error = {..._error, [key]: ''};
        }
      }
    }
    setError(_error);
  };

  const onChangeText = (callback: () => void) => {
    validation();
    callback();
  };

  return (
    <Form
      iosIcon="create-outline"
      title={title}
      visible={isVisible}
      onClose={handleOnCancel}>
      <View style={styles.content}>
        {!item && (
          <View>
            <DropDownPicker
              open={openCategory}
              value={valueCategory}
              items={itemsCategory}
              setOpen={setOpenCategory}
              setValue={setValueCategory}
              setItems={setItemsCategory}
              placeholder={'Pilih kategori'}
              style={styles.dropdownCategory}
              labelStyle={styles.labelCategory}
              placeholderStyle={styles.placeholderCategory}
            />
            <Text style={styles.dropdownCategoryText}>Kategori</Text>
          </View>
        )}
        <OutlinedTextField
          label={'Nomor/kode'}
          value={code}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          maxLength={22}
          onChangeText={text =>
            onChangeText(() => {
              setCode(text);
            })
          }
          error={error.code}
          onBlur={validation}
        />
        <OutlinedTextField
          label={'Nama'}
          value={name}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          maxLength={22}
          onChangeText={text =>
            onChangeText(() => {
              setName(text);
            })
          }
          error={error.name}
          onBlur={validation}
        />
        <View style={styles.twoInput}>
          <OutlinedTextField
            label={'Harga Beli'}
            value={buyPrice.toString()}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputLeft}
            keyboardType="number-pad"
            maxLength={12}
            onChangeText={text =>
              onChangeText(() => {
                if (text.length < 1) {
                  setBuyPrice(0);
                } else {
                  setBuyPrice(parseFloat(text));
                }
              })
            }
            error={error.buyPrice}
            onBlur={validation}
          />

          <OutlinedTextField
            label={'Harga Jual'}
            value={price.toString()}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputRight}
            keyboardType="number-pad"
            maxLength={12}
            error={error.price}
            onChangeText={text =>
              onChangeText(() => {
                if (text.length < 1) {
                  setPrice(0);
                } else {
                  setPrice(parseFloat(text));
                }
              })
            }
            onBlur={validation}
          />
        </View>
        <View style={styles.twoInput}>
          <OutlinedTextField
            label={'Stok'}
            value={quantity.toString()}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputLeft}
            keyboardType="number-pad"
            maxLength={12}
            onChangeText={text =>
              onChangeText(() => {
                if (text.length < 1) {
                  setQuantity(0);
                } else {
                  setQuantity(parseFloat(text));
                }
              })
            }
            error={error.quantity}
            onBlur={validation}
          />
          <OutlinedTextField
            label={'Lokasi'}
            value={location}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            containerStyle={styles.inputRight}
            maxLength={12}
            onChangeText={text =>
              onChangeText(() => {
                setLocation(text);
              })
            }
            error={error.location}
            onBlur={validation}
          />
        </View>
        {!item && (
          <View>
            <DropDownPicker
              open={openImage}
              value={valueImage}
              items={itemsImage}
              setOpen={setOpenImage}
              setValue={setValueImage}
              setItems={setItemsImage}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.dropdownImage,
                marginBottom: openImage ? 200 : 10,
              }}
              labelStyle={styles.labelImage}
              placeholderStyle={styles.placeholderImage}
              placeholder={'Pilih gambar'}
            />
            <Text style={styles.dropdownImageText}>Gambar</Text>
          </View>
        )}

        <OutlinedTextField
          label={'Deskripsi'}
          value={description}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          onChangeText={text =>
            onChangeText(() => {
              setDescription(text);
            })
          }
          error={error.description}
          onBlur={validation}
        />
      </View>
      {buttonAction}
    </Form>
  );
};

export default PartForm;

const styles = StyleSheet.create({
  content: {marginTop: 10},
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
  dropdownImage: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 10,
    borderWidth: 1.2,
    minHeight: 60,
    marginTop: 8,
  },
  dropdownImageText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: -8,
    marginTop: 8,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelImage: {color: color.darkGray, fontSize: 16},
  placeholderImage: {fontSize: 16, color: color.gray},
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
