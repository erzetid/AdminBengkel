// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageButton from './ImageButton';

interface MenuButtonProps {
  title: string;
  image: string;
  onPress: () => void;
}

const MenuButton = ({image, onPress, title}: MenuButtonProps) => {
  return (
    // 3 Button
    <View style={styles.content}>
      <ImageButton title={title} image={image} onPress={onPress} />
    </View>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
});
