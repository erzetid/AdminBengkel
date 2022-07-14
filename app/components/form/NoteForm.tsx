// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {color} from '../../constant/theme';
import {INote} from '../../model/Note';

interface NoteFormProps {
  value: INote;
  onSave: (note: INote) => void;
  onCancel: () => void;
}

const NoteForm = forwardRef<BottomSheetModal, NoteFormProps>(
  ({value, onSave, onCancel}, ref) => {
    const [noteValue, setNoteValue] = useState<INote>();
    const snapPoints = useMemo(() => ['60%', '70%', '100%'], []);

    useEffect(() => {
      setNoteValue(value);
    }, [value]);

    const onChangeText = (text: string, field: keyof INote) => {
      const newNote = {...noteValue!, [field]: text, time: Date.now()};
      setNoteValue(newNote);
    };

    const handleOnSave = useCallback(
      () => onSave(noteValue!),
      [noteValue, onSave],
    );

    const handleOnCancel = useCallback(() => onCancel(), [onCancel]);

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
      [handleOnCancel, handleOnSave],
    );
    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
        <View style={styles.modal}>
          <OutlinedTextField
            label="Judul"
            value={noteValue?.title}
            tintColor={color.lightPurple}
            textColor={color.black}
            onChangeText={text => onChangeText(text, 'title')}
          />
          <View style={styles.contentInput}>
            <TextInput
              style={styles.textContent}
              multiline={true}
              numberOfLines={10}
              value={noteValue?.content}
              textAlignVertical="top"
              onChangeText={text => onChangeText(text, 'content')}
            />
          </View>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{marginTop: 5}}>{buttonAction}</View>
        </View>
      </BottomSheetModal>
    );
  },
);

export default NoteForm;

const styles = StyleSheet.create({
  modal: {
    padding: 20,
  },
  textContent: {
    color: color.black,
  },
  actionContent: {flexDirection: 'row', justifyContent: 'space-between'},
  contentInput: {
    backgroundColor: color.white,
    borderColor: color.darkGray,
    borderWidth: 1,
    borderRadius: 5,
  },
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
