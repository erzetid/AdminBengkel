// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {NoteScreenProps} from './interface';

const NoteScreen: FC<NoteScreenProps> = ({navigation}) => {
  return (
    <SecondBackground>
      <SecondHeader title="Catatan" navigation={navigation} />
    </SecondBackground>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({});
