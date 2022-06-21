import React, {FC, useEffect} from 'react';
import {
  BackHandler,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BACKGROUND} from '../assets/images';
import {Ads, Balance, Header, Menu} from '../components/home';
import {color} from '../constant/theme';
import {HomeScreenProps} from './interface';

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={BACKGROUND.secondary} style={styles.background}>
        <View style={styles.content}>
          <Header navigation={navigation} />
          <Ads>
            <Text>Ads</Text>
          </Ads>
          <Balance />
          <Menu />
        </View>
      </ImageBackground>
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
