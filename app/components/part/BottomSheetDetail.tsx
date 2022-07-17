// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {ImagePart} from '../../constant/enum';
import {color} from '../../constant/theme';
import {getImageSource} from '../../helpers';
import {BottomSheetDetailProps, PartDetail} from '../../screens/interface';
import BackdropBS from '../BackdropBS';
import PartForm from '../form/PartForm';

const BottomSheetDetail = forwardRef<BottomSheetModal, BottomSheetDetailProps>(
  ({detail, openForm, onDelete, onSave, setEditFormShow}, ref) => {
    const snapPoints = useMemo(() => ['35%', '50%', '70%', '100%'], []);

    const handleCancel = useCallback(
      () => setEditFormShow(false),
      [setEditFormShow],
    );
    const handleOpen = useCallback(
      () => setEditFormShow(true),
      [setEditFormShow],
    );
    const onPressDelete = useCallback(() => {
      onDelete(detail!);
    }, [onDelete, detail]);

    const handleSave = useCallback(
      (part: PartDetail) => {
        onSave(part);
      },
      [onSave],
    );

    const formElement = useMemo(() => {
      if (openForm) {
        return (
          <PartForm
            title={'Edit Part'}
            visible={openForm}
            onCancel={handleCancel}
            onSave={handleSave}
            item={detail!}
          />
        );
      }
      return null;
    }, [detail, handleCancel, handleSave, openForm]);

    const DetailText = ({title, value}: {title: string; value: string}) => (
      <Text style={styles.itemTitle}>
        {title}: {<Text style={styles.itemValue}>{value}</Text>}
      </Text>
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BackdropBS}
        style={styles.content}>
        <View style={styles.detailContent}>
          <View style={styles.leftContent}>
            <Text style={styles.itemNameText}>{detail?.name}</Text>
            <DetailText title="Nomor Part" value={detail?.code || ''} />
            <DetailText
              title="Harga Jual"
              value={formatNumber(detail?.price || 0, {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              })}
            />
            <DetailText
              title="Harga Beli"
              value={formatNumber(detail?.buyPrice || 0, {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              })}
            />
            <DetailText title="Lokasi" value={detail?.location || ''} />
            <DetailText title="Deskripsi" value={detail?.description || ''} />
          </View>
          <View style={styles.rightContent}>
            <Text style={{color: color.yellow}}>
              {detail?.category.toUpperCase() || ''}
            </Text>
            <Image
              source={getImageSource(
                detail?.image || ImagePart.DEFAULT,
                'PART',
              )}
              style={styles.image}
            />
            <Text style={styles.itemQuantityText}>
              Stok: {detail?.quantity}
            </Text>
          </View>
        </View>
        <View style={styles.actionContent}>
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.green}}
            onPress={handleOpen}>
            <Icon name="ios-create-outline" color={color.white} size={16} />
            <Text style={styles.btnActionText}>Edit</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.lightBlue}}>
            <Icon name="ios-cart-outline" color={color.white} size={16} />
            <Text style={styles.btnActionText}>Jual</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{...styles.btnAction, backgroundColor: color.red}}
            onPress={onPressDelete}>
            <Icon name="ios-trash-outline" color={color.white} size={16} />
            <Text style={styles.btnActionText}>Hapus</Text>
          </TouchableOpacity>
        </View>
        {formElement}
      </BottomSheetModal>
    );
  },
);

export default BottomSheetDetail;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  detailContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemNameText: {
    color: color.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flexShrink: 1,
  },
  itemTitle: {
    color: color.darkGray,
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  itemValue: {
    color: color.yellow,
  },
  itemQuantityText: {
    borderColor: color.lightBlue,
    color: color.lightBlue,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 3,
    fontSize: 11,
  },
  rightContent: {
    alignItems: 'center',
  },
  leftContent: {
    flexShrink: 1,
    flexGrow: 1,
    marginEnd: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 3,
  },
  actionContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  btnAction: {
    padding: 5,
    borderRadius: 50,
    flexDirection: 'row',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnActionText: {
    color: color.white,
  },
});
