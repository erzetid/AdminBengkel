// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../constant/theme';

interface ImageButtonProps {
  title: string;
  image: any;
  onPress(event: GestureResponderEvent): void;
}
const ImageButton = ({title, image, onPress}: ImageButtonProps) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.btnBackground}>
          <Image style={styles.image} source={image} />
        </View>
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#1B2255',
    height: 65,
    width: 65,
    marginBottom: 5,
    elevation: 5,
  },
  btnBackground: {
    backgroundColor: color.yellow,
    padding: 5,
    borderRadius: 50,
  },
  image: {
    maxHeight: 32,
    width: 32,
  },
  titleText: {color: color.darkGray, fontSize: 12},
});
