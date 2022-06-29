// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../../constant/theme';

interface FormProps {
  children: ReactNode;
  visible: boolean;
  iosIcon: string;
  title: string;
  onClose: () => void;
}

const Form: FC<FormProps> = ({visible, children, iosIcon, title, onClose}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <SafeAreaView style={styles.content}>
        <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
          <Icon name="ios-close" size={20} color={color.white} />
        </TouchableOpacity>
        <View style={styles.titleContent}>
          <Icon name={`ios-${iosIcon}`} color={color.black} size={25} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ScrollView scrollEnabled={true} style={{flex: 1}}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default Form;

const styles = StyleSheet.create({
  content: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: color.white,
    backgroundColor: 'white',
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 1,
  },
  btnClose: {
    backgroundColor: color.darkGray,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    elevation: 5,
  },
  titleContent: {
    marginBottom: 10,
    marginTop: -20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: color.black,
    fontSize: 22,
    marginStart: 5,
  },
});
