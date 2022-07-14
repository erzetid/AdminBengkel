// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {BackHandler, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import NoteForm from '../components/form/NoteForm';
import NoteList from '../components/note/NoteList';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {INote} from '../model/Note';
import {AwesomeAlertProps, NoteScreenProps} from './interface';

const NoteScreen: FC<NoteScreenProps> = ({navigation}) => {
  const addModalRef = useRef<BottomSheetModal>(null);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);

  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [notes, setNotes] = useState<INote[]>([]);

  const noteService = useMemo(() => LocalDB.notes, []);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  useEffect(() => {
    const init = async () => {
      await getNotes();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotes = async () => {
    const n = await noteService.getAll();
    setNotes(n);
  };
  const hideAlert = useCallback(() => {
    setOptionAlert({...optionAlertRef.current, show: false, progress: false});
  }, []);

  const loadAlert = useCallback((message: string = 'Mohon tunggu...') => {
    setOptionAlert({
      ...optionAlertRef.current,
      progress: true,
      show: true,
      title: message,
      message: '',
      buttonCancelShow: false,
      buttonConfirmShow: false,
    });
  }, []);

  const confirmAlert = useCallback(
    (
      {
        title = 'Admin Bengkel',
        message,
      }: {
        title?: string;
        message: string;
      },
      buttonCancelFunction: () => void,
      buttonConfirmFunction: () => void,
    ) => {
      setOptionAlert({
        ...optionAlertRef.current,
        show: true,
        title,
        message,
        buttonConfirmText: 'Ya, lanjutkan',
        buttonCancelText: 'Tidak, batal',
        buttonCancelColor: '#D0D0D0',
        buttonConfirmColor: color.red,
        buttonConfirmShow: true,
        buttonCancelShow: true,
        buttonCancelFunction,
        buttonConfirmFunction,
      });
    },
    [],
  );

  const statusAlert = useCallback(
    (message: string, status: ResultStatus) => {
      setOptionAlert({
        ...optionAlertRef.current,
        progress: false,
        show: true,
        title: status,
        message: message,
        buttonCancelColor:
          status === ResultStatus.SUCCESS ? color.green : color.red,
        buttonCancelShow: true,
        buttonConfirmShow: false,
        buttonCancelText: 'Tutup',
        buttonCancelFunction: hideAlert,
      });
    },
    [hideAlert],
  );
  const handleOpenAddNote = () => {
    addModalRef.current?.present();
  };
  const handleCancelAddNote = () => {
    addModalRef.current?.close();
  };
  const handleSaveAddNote = async (note: INote) => {
    loadAlert();
    try {
      const saving = await noteService.create(note);
      statusAlert(saving.message, saving.status);
      if (saving.status === ResultStatus.SUCCESS) {
        getNotes();
        addModalRef.current?.close();
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };
  const handleOnDeletePress = async (note: INote) => {
    loadAlert();
    try {
      const deleting = await noteService.delete(note.id!);
      statusAlert(deleting.message, deleting.status);
      if (deleting.status === ResultStatus.SUCCESS) {
        getNotes();
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };
  const handleOnDelete = (note: INote) => {
    confirmAlert(
      {message: 'Anda yakin akan menghapus catatan ini?'},
      hideAlert,
      () => handleOnDeletePress(note),
    );
  };
  const handleOnUpdatePress = async (note: INote) => {
    loadAlert();
    try {
      const updating = await noteService.update(note.id!, note);
      statusAlert(updating.message, updating.status);
      if (updating.status === ResultStatus.SUCCESS) {
        getNotes();
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };

  return (
    <SecondBackground>
      <SecondHeader
        title="Catatan"
        navigation={navigation}
        titleColor={color.white}
      />
      <NoteList
        value={notes}
        onDelete={handleOnDelete}
        onUpdate={handleOnUpdatePress}
      />
      <TouchableOpacity
        style={styles.floatingAction}
        onPress={handleOpenAddNote}>
        <Icon name="ios-create-outline" size={30} color={color.white} />
      </TouchableOpacity>
      <NoteForm
        ref={addModalRef}
        value={{
          content: '',
          time: Date.now(),
          title: '',
        }}
        onCancel={handleCancelAddNote}
        onSave={handleSaveAddNote}
      />
      <AlertCustom option={optionAlert} />
    </SecondBackground>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  floatingAction: {
    backgroundColor: color.yellow,
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
