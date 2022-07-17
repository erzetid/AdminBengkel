import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {BACKGROUND} from '../assets/images';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import {Ads, Balance, Header, Menu} from '../components/home';
import Setting from '../components/home/setting';
import {CashFlowType, ResultStatus} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {generateCode} from '../helpers';
import {ICashFlow} from '../model/CashFlow';
import {emptyWorkshop, IWorkshop} from '../model/Workshop';
import {AwesomeAlertProps, HomeScreenProps} from './interface';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5427566701323504/2055860036';
const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const settingRef = useRef<BottomSheetModal>(null);
  const settingsService = useMemo(() => LocalDB.workshops, []);
  const menu = useMemo(() => <Menu navigation={navigation} />, [navigation]);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [setRefPosition, setSetRefPosition] = useState<boolean>(false);
  const [workshop, setWorkshop] = useState(emptyWorkshop);
  const [_visiblePrint, setVisiblePrint] = useState(false);
  const cashesCollection = useMemo(() => LocalDB.cashes, []);
  const txCollection = useMemo(() => LocalDB.transactions, []);

  const [valueBalance, setValueBalance] = useState({income: 0, outcome: 0});

  useEffect(() => {
    const get = async () => {
      await getCash();
      await init();
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txCollection, cashesCollection]);
  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (setRefPosition) {
          settingRef.current?.close();
          setSetRefPosition(false);
          return true;
        }
        confirmAlert(
          {
            message: 'Anda yakin akan keluar?',
          },
          hideAlert,
          () => BackHandler.exitApp(),
        );
        return true;
      },
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRefPosition]);

  const getCash = async () => {
    const _cashes = await cashesCollection.getAll();
    const _tx = await txCollection.getAll();
    const adapterCashes: ICashFlow[] = _cashes.map(x => {
      return {...x, detail: x};
    });
    const adapterTx: ICashFlow[] = _tx.map(x => {
      return {
        amount: x.finalAmount,
        detail: x,
        no: x.no,
        description: '',
        category: x.type,
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
  };

  const init = useCallback(async () => {
    const ws = await settingsService.getAll();
    if (!ws.length) {
      const newWs = await settingsService.create({
        ...workshop,
        code: `${generateCode(3).toUpperCase() + Date.now()}`,
      });
      newWs.data && setWorkshop(newWs.data);
    } else {
      setWorkshop(ws[0]);
    }
    // await settingsService.drop();
  }, [settingsService, workshop]);

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

  const handleOnPressSetting = useCallback(() => {
    settingRef.current?.present();
    setSetRefPosition(true);
  }, []);

  const updateWorkshop = useCallback(
    async (ws: IWorkshop) => {
      loadAlert();
      try {
        const updating = await settingsService.update(ws.id, ws);
        if (updating.status === ResultStatus.SUCCESS) {
          updating.data && setWorkshop({...updating.data, id: ws.id});
        }
        statusAlert(updating.message, updating.status);
      } catch (error) {
        statusAlert('Ada Kesalahan', ResultStatus.ERROR);
      }
    },
    [loadAlert, settingsService, statusAlert],
  );

  const handleOnPressUpdateSetting = useCallback(
    (ws: IWorkshop) => {
      confirmAlert(
        {message: 'Kamu yakin ingin memperbarui data bengkel?'},
        hideAlert,
        () => updateWorkshop(ws),
      );
    },
    [confirmAlert, hideAlert, updateWorkshop],
  );

  const handleOnPrint = useCallback(() => {
    setVisiblePrint(true);
  }, []);

  const adsMemo = useMemo(
    () => (
      <Ads>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </Ads>
    ),
    [],
  );

  // const printerMemo = useMemo(
  //   () => (
  //     <Printer visible={visiblePrint} onClose={() => setVisiblePrint(false)} />
  //   ),
  //   [visiblePrint],
  // );
  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={BACKGROUND.secondary} style={styles.background}>
        <ScrollView>
          <View style={styles.content}>
            <Header
              navigation={navigation}
              onPressSet={handleOnPressSetting}
              workshop={workshop}
            />
            {menu}
            <Pressable onPress={getCash}>
              <Balance
                income={valueBalance.income}
                outcome={valueBalance.outcome}
              />
            </Pressable>
          </View>
          {adsMemo}
        </ScrollView>
      </ImageBackground>
      <AlertCustom option={optionAlert} />
      <Setting
        ref={settingRef}
        onPress={handleOnPressUpdateSetting}
        workshop={workshop}
        onPrinter={handleOnPrint}
      />
      {/* {printerMemo} */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: Dimensions.get('screen').height,
    backgroundColor: color.lightPurple,
  },
  background: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
