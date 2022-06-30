// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useMemo} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICON} from '../../assets/icon';
import {text} from '../../constant/styles';
import {color} from '../../constant/theme';
import {IVehicle} from '../../model/Vehicle';

interface VehicleListProps {
  vehicles: IVehicle[];
  onUpdate: (v: IVehicle) => void;
  onDelete: (v: IVehicle) => void;
}

const VehicleList: FC<VehicleListProps> = ({vehicles, onUpdate, onDelete}) => {
  const handleOnDelete = useCallback(
    (v: IVehicle) => {
      onDelete(v);
    },
    [onDelete],
  );

  const handleOnUpdate = useCallback(
    (v: IVehicle) => {
      onUpdate(v);
    },
    [onUpdate],
  );

  const render = useMemo(
    () =>
      ({item}: {item: IVehicle}) =>
        (
          <View style={styles.content}>
            <View style={styles.imageContent}>
              <Image source={ICON.moto} style={styles.image} />
            </View>
            <View style={styles.textContent}>
              <Text
                style={
                  text.secondaryMediumBold
                }>{`${item.plate} (${item.brand})`}</Text>
              <Text
                style={
                  text.secondarySmall
                }>{`${item.model} (Tahun: ${item.year})`}</Text>
              <Text style={text.secondarySmall}>{item.registrationNumber}</Text>
            </View>
            <View style={styles.actionContent}>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => handleOnUpdate(item)}>
                <Icon name="ios-create-outline" style={text.primaryMedium} />
                <Text style={text.primaryMedium}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => handleOnDelete(item)}>
                <Icon name="ios-trash-outline" style={text.primaryMedium} />
                <Text style={text.primaryMedium}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
    [handleOnDelete, handleOnUpdate],
  );
  return (
    <View>
      {!vehicles?.length && (
        <Text style={styles.text}>Data tidak ditemukan.</Text>
      )}
      <FlatList
        data={vehicles}
        initialNumToRender={10}
        windowSize={5}
        renderItem={render}
      />
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  text: {
    color: color.darkGray,
  },
  imageContent: {
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContent: {
    flexGrow: 1,
    marginStart: 5,
    flexShrink: 1,
    flexDirection: 'column',
  },
  actionContent: {flexDirection: 'column', alignItems: 'center'},
  btnEdit: {
    backgroundColor: color.lightPurple,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 3,
    borderRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    width: 70,
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: color.darkGray,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 3,
    borderRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    width: 70,
    alignItems: 'center',
  },
});
