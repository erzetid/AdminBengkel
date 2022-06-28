// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {format as formatDate} from 'date-fns';
import {id} from 'date-fns/locale';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../../constant/theme';
import {groupArrayByMultiple} from '../../helpers';
import {INote} from '../../model/Note';
import NoteForm from '../form/NoteForm';

interface NoteListProps {
  value: INote[];
  onDelete: (note: INote) => void;
  onUpdate: (note: INote) => void;
}

const NoteList: FC<NoteListProps> = ({value, onDelete, onUpdate}) => {
  const readModalRef = useRef<BottomSheetModal>(null);
  const [noteValue, setNoteValue] = useState<INote>();
  const visualizeNote = useMemo(() => groupArrayByMultiple(value, 2), [value]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        readModalRef.current?.close();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const handleReadNote = (note: INote) => {
    setNoteValue(note);
    readModalRef.current?.present();
  };
  const handleOnSave = (note: INote) => {
    onUpdate(note);
  };
  const handleOnCancel = () => {
    readModalRef.current?.present();
  };

  const handleOnDelete = (note: INote) => {
    onDelete(note);
  };

  return (
    <View style={styles.content}>
      <ScrollView>
        {visualizeNote.map((item, index) => (
          <View key={index} style={styles.contentNote}>
            {item.map((note, i) => (
              <TouchableOpacity
                key={i}
                style={styles.btnNote}
                onPress={() => handleReadNote(note)}>
                <View style={styles.time}>
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <Text style={{color: color.white, fontSize: 10}}>
                    {formatDate(note.time, 'dd/MM/yyyy HH:mm:s', {
                      locale: id,
                    })}
                  </Text>
                </View>
                <Text style={styles.textTitle}>{note.title}</Text>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => handleOnDelete(note)}>
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <Text style={{color: color.white, textAlign: 'center'}}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <NoteForm
        ref={readModalRef}
        onCancel={handleOnCancel}
        value={noteValue!}
        onSave={handleOnSave}
      />
    </View>
  );
};

export default NoteList;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderRadius: 5,
  },
  contentNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  btnNote: {
    width: '45%',
    height: 110,
    marginTop: 10,
    backgroundColor: color.lightBlue,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {textAlign: 'center', flexShrink: 1},
  time: {
    backgroundColor: color.lightPurple,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginTop: 5,
  },
  modal: {
    padding: 20,
  },
  textContent: {
    color: color.black,
  },
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
  btnDelete: {
    marginVertical: 5,
    backgroundColor: color.red,
    padding: 7,
    borderRadius: 5,
    elevation: 2,
    width: '50%',
  },
});
