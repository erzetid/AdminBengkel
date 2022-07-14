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
import {BackHandler} from 'react-native';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import CustomerDetail from '../components/customer/CustomerDetail';
import CustomerList from '../components/customer/CustomerList';
import CustomerForm from '../components/form/CustomerForm';
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {ICustomer} from '../model/Customer';
import {AwesomeAlertProps, CustomerScreenProps} from './interface';

const CustomerScreen: FC<CustomerScreenProps> = ({navigation}) => {
  const customerRef = useRef<ICustomer[]>([]);
  const customerService = useMemo(() => LocalDB.customers, []);
  const addTitle = useMemo(() => 'Tambah Konsumen', []);
  const editTitle = useMemo(() => 'Edit Konsumen', []);
  const emptyCustomer: ICustomer = useMemo(() => {
    return {
      address: '',
      name: '',
      phone: '',
      vehicle: [],
      no: '',
    };
  }, []);

  const customerDetailModalRef = useRef<BottomSheetModal>(null);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);

  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [search, setSearch] = useState('');
  const [titleForm, setTitleForm] = useState('');
  const [visibleForm, setVisibleForm] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [customer, setCustomer] = useState<ICustomer>(emptyCustomer);
  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);
  useEffect(() => {
    const init = async () => {
      getCustomers();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const backAction = () => {
      customerDetailModalRef.current && customerDetailModalRef.current.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const hideAlert = useCallback(() => {
    setOptionAlert({...optionAlertRef.current, show: false, progress: false});
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

  const getCustomers = useCallback(async () => {
    const _customers = await customerService.getAll();
    setCustomers(_customers);
    customerRef.current = _customers;
  }, [customerService]);

  const handleAddButton = useCallback(() => {
    setTitleForm(addTitle);
    setVisibleForm(true);
    setCustomer({...emptyCustomer, no: `17${Date.now()}`});
  }, [addTitle, emptyCustomer]);

  const handleOnFocus = () => {};

  const handleOnPressCustomer = useCallback((c: ICustomer) => {
    setCustomer(c);
    customerDetailModalRef.current?.present();
  }, []);

  const handleOnPressEdit = useCallback(
    (c: ICustomer) => {
      setTitleForm(editTitle);
      setVisibleForm(true);
      setCustomer(c);
    },
    [editTitle],
  );

  const handleOnDelete = useCallback(
    async (c: ICustomer) => {
      try {
        const deleting = await customerService.delete(c.id!);
        if (deleting.status === ResultStatus.SUCCESS) {
          statusAlert(deleting.message, deleting.status);
          getCustomers();
          customerDetailModalRef.current?.close();
        }
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [customerService, getCustomers, statusAlert],
  );

  const handleOnPressDelete = useCallback(
    (c: ICustomer) => {
      confirmAlert(
        {message: 'Apakah kamu akan menghapus konsumen ini?'},
        hideAlert,
        () => handleOnDelete(c),
      );
    },
    [confirmAlert, handleOnDelete, hideAlert],
  );

  const handleOnFormClose = useCallback(() => {
    setVisibleForm(false);
  }, []);

  const handleOnSave = useCallback(
    async (c: ICustomer) => {
      try {
        const saving = await customerService.create(c);
        if (saving.status === ResultStatus.SUCCESS) {
          statusAlert(saving.message, saving.status);
          setVisibleForm(false);
          getCustomers();
        }
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [customerService, getCustomers, statusAlert],
  );
  const handleOnEdit = useCallback(
    async (c: ICustomer) => {
      try {
        const updating = await customerService.update(c.id!, c);
        if (updating.status === ResultStatus.SUCCESS) {
          statusAlert(updating.message, updating.status);
          setVisibleForm(false);
          setCustomer(c);
          getCustomers();
        }
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [customerService, getCustomers, statusAlert],
  );

  const searchingCustomers = useCallback((text: string) => {
    const _costumers = customerRef.current;
    if (text.length < 1) {
      return setCustomers(_costumers);
    }
    const result = _costumers.filter(
      (item: ICustomer) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.no.toLowerCase().includes(text.toLowerCase()),
    );
    setCustomers(result || []);
  }, []);

  return (
    <SecondBackground>
      <SecondHeader
        title="Konsumen"
        navigation={navigation}
        titleColor={color.white}
      />
      <SearchBar
        title={'Cari nama/no konsumen'}
        value={search}
        icon={'add'}
        onPress={handleAddButton}
        onFocus={handleOnFocus}
        onChangeText={t => {
          setSearch(t);
          searchingCustomers(t);
        }}
      />
      <CustomerList data={customers} onPressCustomer={handleOnPressCustomer} />
      <CustomerDetail
        ref={customerDetailModalRef}
        data={customer}
        onPressEdit={handleOnPressEdit}
        onPressDelete={handleOnPressDelete}
      />
      <CustomerForm
        onClose={handleOnFormClose}
        title={titleForm}
        visible={visibleForm}
        value={customer}
        onSave={titleForm === addTitle ? handleOnSave : handleOnEdit}
      />
      <AlertCustom option={optionAlert} />
    </SecondBackground>
  );
};

export default CustomerScreen;
