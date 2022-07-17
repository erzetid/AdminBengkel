// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
import SearchBar from '../components/SearchBar';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import AddTransaction from '../components/transaction/AddTransaction';
import TransactionDetail from '../components/transaction/TransactionDetail';
import TransactionList from '../components/transaction/TransactionList';
import {ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {ITransaction} from '../model/Transaction';
import {AwesomeAlertProps, TransactionScreenProps} from './interface';

const TransactionScreen: FC<TransactionScreenProps> = ({navigation}) => {
  const transactionCollection = useMemo(() => LocalDB.transactions, []);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const txRef = useRef<ITransaction[]>([]);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState<ITransaction>();
  const [visibleAddTx, setVisibleAddTx] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isNewFormAddTx, setIsNewFormAddTx] = useState(false);

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
    const init = async () => {
      await getTransaction();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  const getTransaction = useCallback(async () => {
    const _transactions = await transactionCollection.getAll();
    txRef.current = _transactions;
    setTransactions(_transactions.sort((a, b) => b.time - a.time));
  }, [transactionCollection]);

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

  const handleOnPressItem = useCallback((tx: ITransaction) => {
    setVisible(true);
    setTransaction(tx);
  }, []);

  const handleOnClose = useCallback(() => setVisible(false), []);
  const handleOnCloseAddTx = useCallback(() => setVisibleAddTx(false), []);
  const handleSearchBtn = () => {
    setVisibleAddTx(true);
    setIsNewFormAddTx(true);
  };
  const onAlertTx = useCallback(
    (message: string) => {
      statusAlert(message, ResultStatus.FAILED);
    },
    [statusAlert],
  );
  const onAddTransaction = useCallback(
    async (tx: ITransaction) => {
      loadAlert();
      try {
        const saving = await transactionCollection.create(tx);
        if (saving.status === ResultStatus.SUCCESS) {
          await getTransaction();
          setVisibleAddTx(false);
          setIsNewFormAddTx(false);
        }
        statusAlert(saving.message, saving.status);
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [getTransaction, loadAlert, statusAlert, transactionCollection],
  );
  const handleAddTransaction = useCallback(
    (tx: ITransaction) => {
      confirmAlert(
        {
          message:
            'Apakah semua data terisi dengan benar?\nTransaksi yang sudah disimpan tidak dapat dihapus lagi.',
        },
        hideAlert,
        () => onAddTransaction(tx),
      );
    },
    [onAddTransaction, confirmAlert, hideAlert],
  );

  const searchingTx = (t: string) => {
    if (t.length < 1) {
      return setTransactions(txRef.current.sort((a, b) => b.time - a.time));
    }
    const result = txRef.current.filter(
      item =>
        item.no.toLowerCase().includes(t.toLowerCase()) ||
        item.customer.name.toLowerCase().includes(t.toLowerCase()),
    );
    setTransactions(result.sort((a, b) => b.time - a.time));
  };

  const transactionList = useMemo(
    () => (
      <TransactionList data={transactions} onPressItem={handleOnPressItem} />
    ),
    [handleOnPressItem, transactions],
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

  const addTransaction = useMemo(
    () => (
      <AddTransaction
        title="Tambah Transaksi"
        onClose={handleOnCloseAddTx}
        visible={visibleAddTx}
        onAlert={onAlertTx}
        onAdd={handleAddTransaction}
        isClear={isNewFormAddTx}
      />
    ),
    [
      handleAddTransaction,
      handleOnCloseAddTx,
      isNewFormAddTx,
      onAlertTx,
      visibleAddTx,
    ],
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
        onPress={handleSearchBtn}
        onFocus={() => {}}
        onChangeText={searchingTx}
      />
      {transactionList}
      {transactionDetail}
      {addTransaction}
      <AlertCustom option={optionAlert} />
    </SecondBackground>
  );
};

export default TransactionScreen;
