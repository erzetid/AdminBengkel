// Copyright (c) 2022 fahrizalm14
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
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import ServRegisterForm from '../components/form/ServRegisterForm';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import Dashboard from '../components/serv/Dashboard';
import ServSheet from '../components/serv/ServSheet';
import TabViewServ from '../components/serv/TabViewServ';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {emptyServ, IServ, IWorkOrder} from '../model/Serv';
import {AwesomeAlertProps, ServiceScreenProps} from './interface';

const ServiceScreen: FC<ServiceScreenProps> = ({navigation}) => {
  const actions = useMemo(
    () => [
      {
        text: 'Pendaftaran Servis',
        icon: <Icon name="ios-document-text" size={20} color={color.white} />,
        name: 'btnServRegister',
        position: 1,
        color: color.lightPurple,
      },
      {
        text: 'Data Jasa Servis',
        icon: <Icon name="ios-calculator" size={20} color={color.white} />,
        name: 'btnAddServ',
        position: 2,
        color: color.lightPurple,
      },
    ],
    [],
  );
  const servService = useMemo(() => LocalDB.servs, []);
  const servSheetRef = useRef<BottomSheetModal>(null);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const servsRef = useRef<IServ[]>([]);

  const [visibleFormServ, setVisibleFormServ] = useState<boolean>(false);
  const [titleForm, setTitleForm] = useState<string>('');
  const [titleServForm, setTitleServForm] = useState('');
  const [queue, setQueue] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const [servs, setServs] = useState<IServ[]>([]);
  const [serv, setServ] = useState(emptyServ);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [visibleServ, setVisibleServ] = useState(false);

  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  useEffect(() => {
    const init = async () => {
      await getServs();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getServs = useCallback(async () => {
    const _servs = await servService.getAll();
    servsRef.current = _servs;
    setServs(_servs);
  }, [servService]);

  const handleOnAddServ = useCallback(() => {
    setTitleForm('Pendaftaran Servis');
    setVisibleFormServ(true);
  }, []);

  const handleOnCloseForm = useCallback(() => {
    setTitleForm('');
    setVisibleFormServ(false);
  }, []);

  const handleOnSave = useCallback((wo: IWorkOrder) => {
    console.log(wo);
  }, []);

  const openFormServ = useCallback(() => {
    setTitleServForm('Tambah Jasa Servis');
    setServ({...emptyServ});
    setVisibleServ(true);
  }, []);
  const openFormServUpdate = useCallback((e: IServ) => {
    setTitleServForm('Edit Jasa Servis');
    setServ(e);
    setVisibleServ(true);
  }, []);
  const closeFormServ = useCallback(() => setVisibleServ(false), []);
  const handleOnDeleteServ = useCallback(
    (s: IServ) =>
      confirmAlert(
        {message: 'Apakah anda yakin ingin menghapus jasa ini?'},
        hideAlert,
        async () => {
          loadAlert();
          try {
            const deleting = await servService.delete(s.id!);
            statusAlert(deleting.message, deleting.status);
            if (deleting.status === ResultStatus.SUCCESS) {
              await getServs();
            }
          } catch (error) {
            statusAlert('Ada Kesalahan', ResultStatus.ERROR);
          }
        },
      ),
    [confirmAlert, getServs, hideAlert, loadAlert, servService, statusAlert],
  );
  const handleOnSaveServ = useCallback(
    async (s: IServ) => {
      loadAlert();
      try {
        const saving = await servService.create(s);
        statusAlert(saving.message, saving.status);
        if (saving.status === ResultStatus.SUCCESS) {
          await getServs();
          closeFormServ();
        }
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [closeFormServ, getServs, loadAlert, servService, statusAlert],
  );
  const handleOnUpdateServ = useCallback(
    async (s: IServ) => {
      loadAlert();
      try {
        const updating = await servService.update(s.id!, {
          ...s,
          time: Date.now(),
        });
        statusAlert(updating.message, updating.status);
        if (updating.status === ResultStatus.SUCCESS) {
          await getServs();
          closeFormServ();
        }
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [closeFormServ, getServs, loadAlert, servService, statusAlert],
  );

  const searchingParts = useCallback((text: string) => {
    const result = servsRef.current.filter(
      (item: IServ) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.code.toLowerCase().includes(text.toLowerCase()),
    );
    setServs(result || []);
  }, []);

  const floatingActionMemo = useMemo(() => {
    return (
      <FloatingAction
        actions={actions}
        onPressItem={(name: string | undefined) => {
          switch (name) {
            case 'btnServRegister':
              handleOnAddServ();
              break;
            case 'btnAddServ':
              servSheetRef.current?.present();
              break;
            default:
              break;
          }
        }}
        color={color.yellow}
        overlayColor={'rgba(0, 0, 0, 0.6)'}
      />
    );
  }, [actions, handleOnAddServ]);

  const alertCustom = useMemo(
    () => <AlertCustom option={optionAlert} />,
    [optionAlert],
  );

  const servSheet = useMemo(
    () => (
      <ServSheet
        ref={servSheetRef}
        onAdd={
          titleServForm === 'Tambah Jasa Servis'
            ? handleOnSaveServ
            : handleOnUpdateServ
        }
        data={servs.sort((a, b) => b.time! - a.time!)}
        visible={visibleServ}
        onPress={openFormServ}
        onCancel={closeFormServ}
        onDelete={handleOnDeleteServ}
        onUpdate={openFormServUpdate}
        onFocus={getServs}
        serv={serv}
        titleForm={titleServForm}
        onChangeText={searchingParts}
      />
    ),
    [
      closeFormServ,
      getServs,
      handleOnDeleteServ,
      handleOnSaveServ,
      handleOnUpdateServ,
      openFormServ,
      openFormServUpdate,
      searchingParts,
      serv,
      servs,
      titleServForm,
      visibleServ,
    ],
  );

  return (
    <SecondBackground>
      <SecondHeader
        title={'Servis'}
        navigation={navigation}
        titleColor={color.white}
      />
      <Dashboard done={done} progress={progress} queue={queue} />
      <TabViewServ />
      {floatingActionMemo}
      <ServRegisterForm
        onSave={handleOnSave}
        onClose={handleOnCloseForm}
        visible={visibleFormServ}
        title={titleForm}
      />
      {servSheet}
      {alertCustom}
    </SecondBackground>
  );
};

export default ServiceScreen;
