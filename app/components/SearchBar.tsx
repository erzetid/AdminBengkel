// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {forwardRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/theme';
import {SearchBarProps} from '../screens/interface';

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({title, onPress, onChangeText, onFocus}, ref) => {
    const handleOnPress = useCallback(() => {
      onPress();
    }, [onPress]);
    const handleOnFocus = () => {
      onFocus();
    };
    return (
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Icon
            name="ios-search-outline"
            style={styles.searchBarIcon}
            color={color.gray}
            size={20}
          />
          <TextInput
            ref={ref}
            style={styles.searchBarInput}
            placeholder={title}
            placeholderTextColor={color.gray}
            maxLength={35}
            onChangeText={onChangeText}
            onFocus={handleOnFocus}
          />
        </View>
        <TouchableOpacity style={styles.searchBarBtn} onPress={handleOnPress}>
          <Text style={styles.searchBarBtnText}>Cari</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default SearchBar;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 10,
  },
  searchBar: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.white,
  },
  searchBarIcon: {marginStart: 20},
  searchBarInput: {
    flex: 1,
    color: color.darkGray,
  },
  searchBarBtn: {
    marginStart: 5,
    backgroundColor: color.lightPurple,
    minWidth: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  searchBarBtnText: {textAlign: 'center', color: color.white},
});
