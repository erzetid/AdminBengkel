// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {color} from '../constant/theme';
import {DonationScreenProps} from './interface';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-5427566701323504/5692918375';
let rewarded: RewardedAd;
const DonationScreen: FC<DonationScreenProps> = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);

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
    rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        navigation?.navigate('HomeScreen');
      },
    );
    rewarded.addAdEventListener(AdEventType.ERROR, () => {
      navigation?.navigate('HomeScreen');
    });

    // Start loading the rewarded ad straight away
    rewarded.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClickAds = useCallback(() => {
    rewarded.show();
  }, []);

  return (
    <SecondBackground>
      <SecondHeader
        title="Donasi"
        navigation={navigation}
        titleColor={color.white}
      />
      <View style={styles.content}>
        <Text style={styles.textIntro}>
          {'   '}Dengan anda berdonasi secara tidak langsung anda berkontribusi
          untuk untuk pengembangan apliasi AdminBengkel dan pembuatan aplikasi
          booking servis untuk calon konsumen anda di seluruh Indonesia.
        </Text>
        <TouchableOpacity
          style={loaded ? styles.btnActive : styles.btnNotActive}
          onPress={handleOnClickAds}
          disabled={!loaded}>
          <Text style={styles.text}>TONTON IKLAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnActive}
          onPress={() => {
            const url = 'https://saweria.co/andrifahrizal';
            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              } else {
                console.log('Donasi gagal');
              }
            });
          }}>
          <Text style={styles.text}>SAWERIA</Text>
        </TouchableOpacity>
        <Text style={styles.textIntro}>{'\n'}Info kolaborasi/kontribusi:</Text>
        <Text style={styles.textIntro}>
          Alamat: Sawojajar, Wanasari, Brebes
        </Text>
        <Text style={styles.textIntro}>Whatsapp: 08156257921</Text>
      </View>
    </SecondBackground>
  );
};

export default DonationScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: color.white,
    borderRadius: 5,
  },
  textIntro: {color: color.darkGray, textAlign: 'justify'},
  btnActive: {
    backgroundColor: color.lightBlue,
    padding: 15,
    borderRadius: 5,
    elevation: 1,
    marginVertical: 5,
  },
  btnNotActive: {
    backgroundColor: color.darkGray,
    padding: 15,
    borderRadius: 5,
    elevation: 1,
    marginVertical: 5,
  },
  text: {
    color: color.white,
    fontSize: 20,
    textAlign: 'center',
  },
});
