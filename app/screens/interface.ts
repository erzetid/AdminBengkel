// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {NavigationProp, ParamListBase} from '@react-navigation/native';

export interface ScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export interface HomeScreenProps extends ScreenProps {}
export interface PartScreenProps extends ScreenProps {}
export interface ReportScreenProps extends ScreenProps {}
export interface ServiceScreenProps extends ScreenProps {}
