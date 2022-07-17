// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import CashFlowList from '../components/cashflow/CashFlowList';
import Form from '../components/form/Form';
import {Balance} from '../components/home';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {CashCategory, CashFlowType, ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {emptyCashes, ICashes, ICashFlow} from '../model/CashFlow';
import {AwesomeAlertProps, CashFlowScreenProps} from './interface';

const CashFlowScreen: FC<CashFlowScreenProps> = ({navigation}) => {
  const [visibleCash, setVisibleCash] = useState(false);
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const cashesCollection = useMemo(() => LocalDB.cashes, []);
  const txCollection = useMemo(() => LocalDB.transactions, []);

  const [valueBalance, setValueBalance] = useState({income: 0, outcome: 0});

  // ==============================================================
  const cashesRef = useRef<ICashes>(emptyCashes);
  const [openCashFlow, setOpenCashFlow] = useState(false);
  const [valueCashFlow, setValueCashFlow] = useState<CashFlowType>();
  const [itemsCashFlow, setItemsCashFlow] = useState<
    {
      label: string;
      value: CashFlowType;
    }[]
  >([
    {label: 'Pengeluaran', value: CashFlowType.OUTCOME},
    {label: 'Pemasukan', value: CashFlowType.INCOME},
  ]);
  const [cashFlows, setCashFlows] = useState<ICashFlow[]>([]);

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
      await getCashFlow();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCashFlow = async () => {
    // await cashesCollection.drop();
    const _cashes = await cashesCollection.getAll();
    const _tx = await txCollection.getAll();
    const adapterCashes: ICashFlow[] = _cashes.map(x => {
      return {...x, detail: x, id: `${x.time}`, category: CashCategory.DIRECT};
    });
    const adapterTx: ICashFlow[] = _tx.map(x => {
      return {
        amount: x.finalAmount,
        detail: x,
        no: x.no,
        category: x.type,
        description: 'Penjualan ' + x.type,
        time: x.time,
        type: CashFlowType.INCOME,
      };
    });
    const concatCash = adapterCashes.concat(adapterTx);
    let income = 0;
    let outcome = 0;
    concatCash.forEach(x => {
      if (x.type === CashFlowType.INCOME) {
        income += x.amount;
      }
      if (x.type === CashFlowType.OUTCOME) {
        outcome += x.amount;
      }
    });

    setValueBalance({income, outcome});
    setCashFlows(concatCash);
  };

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

  const statusAlert = (message: string, status: ResultStatus) => {
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
  };

  const handleOpenAddCash = () => {
    setVisibleCash(true);
  };

  const handleSelectCashes = () => {
    const _cash = cashesRef.current;
    if (valueCashFlow) {
      cashesRef.current = {..._cash, type: valueCashFlow};
    }
  };

  const handleChangeChases = (text: string, field: keyof ICashes) => {
    const _cash = cashesRef.current;
    cashesRef.current = {
      ..._cash,
      [field]: field === 'amount' ? parseInt(text, 10) : text,
    };
  };

  const handleAddCashFlow = async () => {
    loadAlert();
    try {
      const time = Date.now();
      const saving = await cashesCollection.create({
        ...cashesRef.current,
        time,
        no: `DT${time}`,
      });
      console.log(saving.data);
      if (saving.status === ResultStatus.SUCCESS) {
        cashesRef.current = emptyCashes;
        setValueCashFlow(undefined);
        setVisibleCash(false);
        await getCashFlow();
      }
      statusAlert(saving.message, saving.status);
    } catch (error) {
      statusAlert('Ada Kesalahan', ResultStatus.ERROR);
    }
  };

  const handleOnAddCashFlow = () => {
    confirmAlert(
      {message: 'Apakah kamu yakin akan menyimpannya?'},
      hideAlert,
      handleAddCashFlow,
    );
  };

  const cashList = useMemo(
    () => <CashFlowList data={cashFlows} />,
    [cashFlows],
  );

  return (
    <SecondBackground>
      <SecondHeader
        title="Buku Kas"
        navigation={navigation}
        titleColor={color.white}
      />
      <Balance income={valueBalance.income} outcome={valueBalance.outcome} />
      <View style={styles.content}>
        <TouchableOpacity style={styles.btnCash} onPress={handleOpenAddCash}>
          <Text style={styles.textBtnCash}>
            <Icon name="wallet-outline" color={color.white} size={18} /> Tambah
            Kas Langsung
          </Text>
        </TouchableOpacity>
      </View>
      {cashList}
      <Form
        title="Tambah Kas Langsung"
        iosIcon="wallet-outline"
        visible={visibleCash}
        onClose={() => setVisibleCash(false)}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{marginTop: 10}}>
          <DropDownPicker
            open={openCashFlow}
            value={valueCashFlow!}
            items={itemsCashFlow}
            setOpen={setOpenCashFlow}
            setValue={setValueCashFlow}
            setItems={setItemsCashFlow}
            placeholder={'Pilih tipe kas'}
            style={styles.dropdownCashFlow}
            labelStyle={styles.labelCashFlow}
            placeholderStyle={styles.placeholderCashFlow}
            listMode="SCROLLVIEW"
            onChangeValue={handleSelectCashes}
          />
          <Text style={styles.dropdownCashFlowText}>Tipe Kas</Text>
        </View>
        <OutlinedTextField
          label={'Jumlah Rp'}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          keyboardType="number-pad"
          onChangeText={t => {
            if (t.length < 1) {
              handleChangeChases('0', 'amount');
            } else {
              handleChangeChases(t, 'amount');
            }
          }}
        />
        <OutlinedTextField
          label={'Deskripsi'}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          multiline={true}
          characterRestriction={150}
          maxLength={150}
          onChangeText={t => handleChangeChases(t, 'description')}
        />
        <View style={styles.actionContent}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setVisibleCash(false)}>
            <Text style={{color: color.white}}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSave}
            onPress={handleOnAddCashFlow}
            disabled={!valueCashFlow}>
            <Text style={{color: color.white}}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </Form>
      <AlertCustom option={optionAlert} />
    </SecondBackground>
  );
};

export default CashFlowScreen;

const styles = StyleSheet.create({
  content: {},
  btnCash: {
    backgroundColor: color.yellow,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textBtnCash: {color: color.white, fontSize: 16},
  dropdownCashFlow: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 10,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownCashFlowText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: -8,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelCashFlow: {color: color.darkGray, fontSize: 16},
  placeholderCashFlow: {fontSize: 16, color: color.gray},
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
});
