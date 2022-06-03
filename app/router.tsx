/* eslint-disable react-native/no-inline-styles */
// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TaskContext from './models';
import HomeScreen from './screens/HomeScreen';
const {RealmProvider} = TaskContext;

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <RealmProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
};
