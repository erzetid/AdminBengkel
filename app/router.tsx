/* eslint-disable react-native/no-inline-styles */
// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  CashFlowScreen,
  CustomerScreen,
  DonationScreen,
  HomeScreen,
  NoteScreen,
  PartScreen,
  ReportScreen,
  ServiceScreen,
  SplashScreen,
  TransactionScreen,
  VehicleScreen,
} from './screens';

export type MainStackParamList = {
  HomeScreen: undefined;
  PartScreen: undefined;
  ReportScreen: undefined;
  ServiceScreen: undefined;
  SplashScreen: undefined;
  VehicleScreen: undefined;
  TransactionScreen: undefined;
  NoteScreen: undefined;
  DonationScreen: undefined;
  CashFlowScreen: undefined;
  CustomerScreen: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const screens: {name: any; component: any}[] = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
  },
  {
    name: 'PartScreen',
    component: PartScreen,
  },
  {
    name: 'ReportScreen',
    component: ReportScreen,
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'ServiceScreen',
    component: ServiceScreen,
  },
  {
    name: 'VehicleScreen',
    component: VehicleScreen,
  },
  {
    name: 'CustomerScreen',
    component: CustomerScreen,
  },
  {
    name: 'CashFlowScreen',
    component: CashFlowScreen,
  },
  {
    name: 'DonationScreen',
    component: DonationScreen,
  },
  {
    name: 'NoteScreen',
    component: NoteScreen,
  },
  {
    name: 'TransactionScreen',
    component: TransactionScreen,
  },
];
export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={DefaultTheme}>
            <MainStack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                headerShown: false,
              }}>
              {screens.map(route => (
                <MainStack.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component}
                  options={{
                    animation:
                      route.name === 'HomeScreen'
                        ? 'slide_from_bottom'
                        : 'simple_push',
                  }}
                />
              ))}
            </MainStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({container: {flex: 1}});
