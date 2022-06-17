/* eslint-disable react-native/no-inline-styles */
// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TaskContext from './models';
import {HomeScreen, PartScreen, ReportScreen, ServiceScreen} from './screens';
const {RealmProvider} = TaskContext;

export type MainStackParamList = {
  HomeScreen: undefined;
  PartScreen: undefined;
  ReportScreen: undefined;
  ServiceScreen: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();
export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <RealmProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer theme={DefaultTheme}>
              <MainStack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{headerShown: false}}>
                <MainStack.Screen name="HomeScreen" component={HomeScreen} />
                <MainStack.Screen name="PartScreen" component={PartScreen} />
                <MainStack.Screen
                  name="ReportScreen"
                  component={ReportScreen}
                />
                <MainStack.Screen
                  name="ServiceScreen"
                  component={ServiceScreen}
                />
              </MainStack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </RealmProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({container: {flex: 1}});
