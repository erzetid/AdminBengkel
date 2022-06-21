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
import {BackHandler, TextInput} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import PartForm from '../components/form/PartForm';
import BottomSheetDetail from '../components/part/BottomSheetDetail';
import BottomSheetStock from '../components/part/BottomSheetStock';
import PartList from '../components/part/PartList';
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {AwesomeAlertProps, PartDetail, ServiceScreenProps} from './interface';

const actions = [
  {
    text: 'Tambah Spare Part',
    icon: <Icon name="ios-add-circle-outline" size={20} color={color.white} />,
    name: 'btnAddPart',
    position: 2,
    color: color.lightPurple,
  },
  {
    text: 'Buat Penjualan Part',
    icon: <Icon name="ios-cart" size={20} color={color.white} />,
    name: 'btnBuyPart',
    position: 1,
    color: color.lightPurple,
  },
];
const PartScreen: FC<ServiceScreenProps> = ({navigation}) => {
  const partService = LocalDB.parts;
  const stockModalRef = useRef<BottomSheetModal>(null);
  const detailModalRef = useRef<BottomSheetModal>(null);
  const searchBarRef = useRef<TextInput>(null);
  const searchBarText = useRef<string>('');
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const searchParts = useRef<PartDetail[]>();

  const [detail, setDetail] = useState<PartDetail | null>(null);
  const [parts, setParts] = useState<PartDetail[]>([]);
  const [stockModalValue, setStockModalValue] = useState<PartDetail>();
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [stock, setStock] = useState(0);
  const [showAddPartForm, setShowAddPartForm] = useState(false);
  const [editFormShow, setEditFormShow] = useState(false);

  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  useEffect(() => {
    loadAlert();
    const init = async () => {
      try {
        // await partService.drop();
        const getParts = await partService.getAll();
        setParts(getParts);
        searchParts.current = getParts;
      } finally {
        hideAlert();
      }
    };

    init();
  }, [partService]);

  useEffect(() => {
    // console.log(tasks);
    const backAction = () => {
      stockModalRef.current && stockModalRef.current.close();
      detailModalRef.current && detailModalRef.current.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const hideAlert = () => {
    setOptionAlert({...optionAlertRef.current, show: false, progress: false});
  };

  const loadAlert = (message: string = 'Mohon tunggu...') => {
    setOptionAlert({
      ...optionAlertRef.current,
      progress: true,
      show: true,
      title: message,
      message: '',
      buttonCancelShow: false,
      buttonConfirmShow: false,
    });
  };

  const confirmAlert = (
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
  };

  const statusAlert = useCallback((message: string, status: ResultStatus) => {
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
  }, []);

  const handleSetStock = useCallback((value: PartDetail) => {
    stockModalRef.current?.present();
    setStockModalValue(value);
    setStock(value.quantity);
  }, []);

  const handleSaveStock = async (id: string) => {
    loadAlert();
    try {
      const updating = await partService.update(id, {
        ...stockModalValue!,
        quantity: stock,
      });
      statusAlert(updating.message, updating.status);
      if (updating.status === ResultStatus.SUCCESS) {
        const indexOf = parts.indexOf(stockModalValue!);
        parts[indexOf] = updating.data!;
        stockModalRef.current?.dismiss();
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };

  const handleSavePart = async (part: PartDetail) => {
    if (!formPartValidation(part)) {
      statusAlert('Mohon isi data part dengan benar', ResultStatus.FAILED);
      return;
    }
    loadAlert();

    try {
      const saving = await partService.create(part);
      statusAlert(saving.message, saving.status);

      if (saving.status === ResultStatus.SUCCESS) {
        setShowAddPartForm(false);
        parts.push(saving.data!);
        // searchParts.current?.push(part);
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };

  const handleUpdatePart = async (part: PartDetail) => {
    if (!formPartValidation(part)) {
      statusAlert('Mohon isi data part dengan benar', ResultStatus.FAILED);
      return;
    }
    loadAlert();
    try {
      const updating = await partService.update(detail?.id!, part);
      statusAlert(updating.message, updating.status);
      if (updating.status === ResultStatus.SUCCESS) {
        detailModalRef.current?.close();
        setEditFormShow(false);
        const indexOf = parts.indexOf(detail!);
        parts[indexOf] = updating.data!;
      }
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };
  const handleItemPress = (value: PartDetail) => {
    setDetail(value);
    detailModalRef.current?.present();
  };

  const handlePressDeletePart = async (part: PartDetail) => {
    loadAlert();
    try {
      const deleting = await partService.delete(part.id!);
      statusAlert(deleting.message, deleting.status);
      if (deleting.status === ResultStatus.SUCCESS) {
        const indexPart = parts.indexOf(part);
        if (indexPart > -1) {
          parts.splice(indexPart, 1);
        }
      }
      detailModalRef.current?.close();
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };

  const handleDeletePart = (part: PartDetail) => {
    confirmAlert(
      {message: 'Apakah kamu yakin akan menghapus part ini?'},
      hideAlert,
      () => handlePressDeletePart(part),
    );
  };

  const formPartValidation = (obj: any): boolean => {
    for (const key in obj) {
      if (key !== 'category' && key !== 'image') {
        if (!obj[key]) {
          return false;
        }
      }
    }
    return true;
  };

  const floatingActionMemo = useMemo(() => {
    return (
      <FloatingAction
        actions={actions}
        onPressItem={(name: string | undefined) => {
          switch (name) {
            case 'btnAddPart':
              setShowAddPartForm(true);
              break;
            case 'btnBuyPart':
              setShowAddPartForm(true);
              break;
            default:
              break;
          }
        }}
        color={color.yellow}
        overlayColor={'rgba(0, 0, 0, 0.6)'}
        actionsPaddingTopBottom={0}
      />
    );
  }, []);
  return (
    <SecondBackground>
      <SecondHeader navigation={navigation} title={'Spare Part'} />
      <SearchBar
        ref={searchBarRef}
        title={'Carai nama/nomor part'}
        onPress={() => console.log(searchBarText.current)}
        onChangeText={text => {
          if (searchBarRef.current) {
            searchBarText.current = text;
          }
        }}
      />
      <PartList
        data={parts}
        handleItemPress={handleItemPress}
        handleStockModalPress={handleSetStock}
      />

      <BottomSheetDetail
        ref={detailModalRef}
        detail={detail}
        navigation={navigation}
        onSave={handleUpdatePart}
        onDelete={handleDeletePart}
        openForm={editFormShow}
        setEditFormShow={setEditFormShow}
      />

      <BottomSheetStock
        stock={stock}
        setStock={setStock}
        ref={stockModalRef}
        item={stockModalValue!}
        onSave={handleSaveStock}
      />
      <AlertCustom option={optionAlert} />
      <PartForm
        title={'Tambah Part'}
        visible={showAddPartForm}
        onCancel={() => setShowAddPartForm(false)}
        onSave={handleSavePart}
      />
      {floatingActionMemo}
    </SecondBackground>
  );
};

export default PartScreen;
