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
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {BACKGROUND} from '../assets/images';
import AlertCustom, {emptyAlert} from '../components/AlertCustom';
import {Ads, Header, Menu} from '../components/home';
import {color} from '../constant/theme';
import {AwesomeAlertProps, HomeScreenProps} from './interface';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5427566701323504/2055860036';
const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const optionAlertRef = useRef<AwesomeAlertProps>(emptyAlert);
  const [optionAlert, setOptionAlert] = useState<AwesomeAlertProps>(emptyAlert);
  const menu = useMemo(() => <Menu navigation={navigation} />, [navigation]);

  useEffect(() => {
    optionAlertRef.current = optionAlert;
  }, [optionAlert]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        confirmAlert();
        return true;
      },
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={BACKGROUND.secondary} style={styles.background}>
        <View style={styles.content}>
          <Header navigation={navigation} />
          <Ads>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </Ads>
          {/* <Balance /> */}
          {menu}
        </View>
      </ImageBackground>
      <AlertCustom option={optionAlert} />
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
