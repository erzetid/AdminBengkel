// Copyright (c) 2022 https://www.adminbengkel.my.id
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
import {text} from '../constant/styles';
import {color} from '../constant/theme';

interface CardButtonProps {
  title: string;
  image: any;
  onPress(event: GestureResponderEvent): void;
}
const CardButton = ({title, image, onPress}: CardButtonProps) => {
  return (
    <View style={styles.cardButton}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
      <Text style={text.primarySmall}>{title}</Text>
    </View>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  cardButton: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: -25,
    alignItems: 'center',
    backgroundColor: color.darkBlue,
    height: 65,
    width: 65,
    marginBottom: 5,
    elevation: 5,
  },
  image: {
    height: 32,
    width: 32,
  },
});
