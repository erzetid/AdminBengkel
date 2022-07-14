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
import {color} from '../constant/theme';
import {AwesomeAlertProps, HomeScreenProps} from './interface';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5427566701323504/2055860036';
const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const settingRef = useRef<BottomSheetModal>(null);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const [setRefPosition, setSetRefPosition] = useState<boolean>(false);
  const menu = useMemo(() => <Menu navigation={navigation} />, [navigation]);

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
        confirmAlert();
        return true;
      },
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRefPosition]);

  const hideAlert = useCallback(() => {
    setOptionAlert({...optionAlertRef.current, show: false, progress: false});
  }, []);
  const confirmAlert = useCallback(() => {
    setOptionAlert({
      ...optionAlertRef.current,
      show: true,
      title: 'Admin Bengkel',
      message: 'Anda yakin akan keluar?',
      buttonConfirmText: 'Ya, lanjutkan',
      buttonCancelText: 'Tidak, batal',
      buttonCancelColor: '#D0D0D0',
      buttonConfirmColor: color.red,
      buttonConfirmShow: true,
      buttonCancelShow: true,
      buttonCancelFunction: () => hideAlert(),
      buttonConfirmFunction: () => BackHandler.exitApp(),
    });
  }, [hideAlert]);

  const handleOnPressSetting = useCallback(() => {
    settingRef.current?.present();
    setSetRefPosition(true);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <ImageBackground
          source={BACKGROUND.secondary}
          style={styles.background}>
          <View style={styles.content}>
            <Header navigation={navigation} onPressSet={handleOnPressSetting} />
            {menu}
            <Balance />
          </View>
          <Ads>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </Ads>
        </ImageBackground>
      </ScrollView>
      <AlertCustom option={optionAlert} />
      <Setting ref={settingRef} />
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
