// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler} from 'react-native';
import {ICON} from '../assets/icon/index';
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import TransactionDetail from '../components/transaction/TransactionDetail';
import TransactionList from '../components/transaction/TransactionList';
import {
  Category,
  CategoryServ,
  TransactionStatus,
  TransactionType,
} from '../constant/enum';
import {color} from '../constant/theme';
import {ITransaction} from '../model/Transaction';
import {TransactionScreenProps} from './interface';

const data: ITransaction[] = [
  {
    id: '1',
    amount: 100000,
    amountDiscount: 0,
    amountTax: 0,
    customer: {
      address: 'Alamat',
      name: 'Tidak ada nama',
      no: '00000000000000',
      phone: '0000000',
      id: '0',
      vehicle: [
        {
          brand: 'Brand',
          model: 'Model',
          plate: 'H1796SEP',
          registrationNumber: 'REG1302',
          year: 2012,
        },
      ],
    },
    time: Date.now(),
    discount: 0,
    no: `TX${Date.now()}`,
    status: TransactionStatus.PAID,
    tax: 0,
    totalPart: 20000,
    totalServ: 80000,
    type: TransactionType.SERVICE,
    finalAmount: 100000,
    products: {
      p: [
        {
          buyPrice: 10000,
          code: '06565-646-0000',
          description: '',
          location: 'Harus diisi.',
          name: 'Busi SX125',
          price: 20000,
          quantity: 1,
          time: Date.now(),
          category: Category.ENGINE,
          image: ICON.moto,
        },
      ],
      s: [
        {
          name: 'Servis Lengkap Matic',
          code: 'SV-545445454',
          price: 80000,
          processTime: 30,
          description: '',
          category: CategoryServ.REGULAR,
          time: 0,
        },
      ],
    },
  },
  {
    id: '2',
    amount: 80000,
    amountDiscount: 0,
    amountTax: 0,
    customer: {
      address: 'Alamat',
      name: 'Tidak ada nama',
      no: '00000000000000',
      phone: '0000000',
      id: '0',
      vehicle: [],
    },
    time: Date.now(),
    discount: 0,
    no: `TX${Date.now()}`,
    status: TransactionStatus.UNPAID,
    tax: 0,
    totalPart: 80000,
    totalServ: 0,
    type: TransactionType.PART,
    finalAmount: 80000,
    products: {
      p: [
        {
          buyPrice: 50000,
          code: '06565-646-0000',
          description: '',
          location: 'Harus diisi.',
          name: 'Busi SX125',
          price: 80000,
          quantity: 1,
          time: Date.now(),
          category: Category.ENGINE,
          image: ICON.moto,
        },
      ],
      s: [],
    },
  },
];

const TransactionScreen: FC<TransactionScreenProps> = ({navigation}) => {
  // const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  // const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState<ITransaction>();

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

  // const hideAlert = useCallback(() => {
  //   setOptionAlert({...optionAlertRef.current, show: false, progress: false});
  // }, []);

  // const loadAlert = useCallback((message: string = 'Mohon tunggu...') => {
  //   setOptionAlert({
  //     ...optionAlertRef.current,
  //     progress: true,
  //     show: true,
  //     title: message,
  //     message: '',
  //     buttonCancelShow: false,
  //     buttonConfirmShow: false,
  //   });
  // }, []);

  // const confirmAlert = useCallback(
  //   (
  //     {
  //       title = 'Admin Bengkel',
  //       message,
  //     }: {
  //       title?: string;
  //       message: string;
  //     },
  //     buttonCancelFunction: () => void,
  //     buttonConfirmFunction: () => void,
  //   ) => {
  //     setOptionAlert({
  //       ...optionAlertRef.current,
  //       show: true,
  //       title,
  //       message,
  //       buttonConfirmText: 'Ya, lanjutkan',
  //       buttonCancelText: 'Tidak, batal',
  //       buttonCancelColor: '#D0D0D0',
  //       buttonConfirmColor: color.red,
  //       buttonConfirmShow: true,
  //       buttonCancelShow: true,
  //       buttonCancelFunction,
  //       buttonConfirmFunction,
  //     });
  //   },
  //   [],
  // );

  // const statusAlert = useCallback(
  //   (message: string, status: ResultStatus) => {
  //     setOptionAlert({
  //       ...optionAlertRef.current,
  //       progress: false,
  //       show: true,
  //       title: status,
  //       message: message,
  //       buttonCancelColor:
  //         status === ResultStatus.SUCCESS ? color.green : color.red,
  //       buttonCancelShow: true,
  //       buttonConfirmShow: false,
  //       buttonCancelText: 'Tutup',
  //       buttonCancelFunction: hideAlert,
  //     });
  //   },
  //   [hideAlert],
  // );

  const handleOnPressItem = useCallback((tx: ITransaction) => {
    setVisible(true);
    setTransaction(tx);
  }, []);

  const handleOnClose = useCallback(() => setVisible(false), []);

  const transactionList = useMemo(
    () => <TransactionList data={data} onPressItem={handleOnPressItem} />,
    [handleOnPressItem],
  );
  const transactionDetail = useMemo(
    () => (
      <TransactionDetail
        visible={visible}
        onClose={handleOnClose}
        data={transaction}
      />
    ),
    [handleOnClose, transaction, visible],
  );

  return (
    <SecondBackground>
      <SecondHeader
        title="Transaksi"
        navigation={navigation}
        titleColor={color.white}
      />
      <SearchBar
        title={'Cari nomor transaksi/plat'}
        icon={'cart-outline'}
        onPress={() => {}}
        onFocus={() => {}}
      />
      {transactionList}
      {transactionDetail}
      {/* <AlertCustom option={optionAlert} /> */}
    </SecondBackground>
  );
};

export default TransactionScreen;
