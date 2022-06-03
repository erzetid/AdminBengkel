/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ICON} from '../assets/icon';
import {BACKGROUND} from '../assets/images';
import Feature1 from '../components/feature1';
import ImageButton from '../components/ImageButton';
import {text} from '../constant/styles';
import {color} from '../constant/theme';

export default function HomeScreen() {
  const handle = () => {
    ToastAndroid.show('Oke', 1);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={BACKGROUND.secondary} style={styles.background}>
        <ScrollView scrollEnabled={true}>
          <View style={styles.content}>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginEnd: 10,
                }}>
                <Text style={{fontSize: 22}}>Bengkel Cometor</Text>
                <Text style={text.primarySmall}>
                  {'Menyawak, mau profit berapa hari ini? '}
                </Text>
              </View>
              <View
                style={{
                  padding: 5,
                  backgroundColor: color.darkBlue,
                  borderRadius: 50,
                  marginTop: -40,
                  right: -18,
                }}>
                <Pressable>
                  <Image source={ICON.workshop} />
                </Pressable>
              </View>
            </View>
            <Feature1 />
            <View style={{marginTop: 10}}>
              <View
                style={{
                  backgroundColor: color.gray,
                  minHeight: 80,
                  borderRadius: 5,
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Ads</Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={text.primaryMedium}>Kas saat ini</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={styles.debit}>
                <Text style={{color: '#EDE4E4'}}>Pemasukan</Text>
                <Text
                  style={{
                    color: '#91ECC9',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Rp2.000.000
                </Text>
              </View>
              <View style={styles.debit1}>
                <Text style={{color: '#EDE4E4'}}>Pengeluaran</Text>
                <Text
                  style={{
                    color: '#E04949',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Rp.0
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={text.primaryMedium}>Fitur Aplikasi</Text>
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }}>
                  <ImageButton
                    title={'Buku Kas'}
                    image={ICON.cashBook}
                    onPress={handle}
                  />
                  <ImageButton
                    title={'Buku Hutang'}
                    image={ICON.debt}
                    onPress={handle}
                  />
                  <ImageButton
                    title={'Transaksi'}
                    image={ICON.transaction}
                    onPress={handle}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }}>
                  <ImageButton
                    title={'Konsumen'}
                    image={ICON.customer}
                    onPress={handle}
                  />
                  <ImageButton
                    title={'Catatan'}
                    image={ICON.note}
                    onPress={handle}
                  />
                  <ImageButton
                    title={'Donasi'}
                    image={ICON.donation}
                    onPress={handle}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  debit: {
    flexGrow: 1,
    backgroundColor: color.darkBlue,
    borderRadius: 10,
    minHeight: 60,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginEnd: 5,
  },
  debit1: {
    flexGrow: 1,
    backgroundColor: color.lightPurple,
    borderRadius: 10,
    minHeight: 60,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
