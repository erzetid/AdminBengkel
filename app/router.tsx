/* eslint-disable react-native/no-inline-styles */
// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HomeScreen, PartScreen, ReportScreen, ServiceScreen} from './screens';
import SplashScreen from './screens/SplashScreen';

export type MainStackParamList = {
  HomeScreen: undefined;
  PartScreen: undefined;
  ReportScreen: undefined;
  ServiceScreen: undefined;
  SplashScreen: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();
export default () => {
  const screens: {name: any; component: any}[] = useMemo(
    () => [
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
    ],
    [],
  );
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
