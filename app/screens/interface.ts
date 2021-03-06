// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {Category, ImagePart} from '../constant/enum';

export interface ScreenProps {
  navigation?: NavigationProp<ParamListBase>;
}

export interface HomeScreenProps extends ScreenProps {}
export interface PartScreenProps extends ScreenProps {}
export interface ReportScreenProps extends ScreenProps {}
export interface ServiceScreenProps extends ScreenProps {}
export interface SplashScreenProps extends ScreenProps {}
export interface VehicleScreenProps extends ScreenProps {}
export interface CustomerScreenProps extends ScreenProps {}
export interface TransactionScreenProps extends ScreenProps {}
export interface CashFlowScreenProps extends ScreenProps {}
export interface NoteScreenProps extends ScreenProps {}
export interface DonationScreenProps extends ScreenProps {}
export interface PartDetail {
  id?: string;
  name: string;
  code: string;
  category: Category;
  description: string;
  quantity: number;
  price: number;
  buyPrice: number;
  image: ImagePart;
  location: string;
  time?: number;
}

export interface BottomSheetDetailProps extends ScreenProps {
  detail: PartDetail | null;
  openForm: boolean;
  onSave: (part: PartDetail) => void;
  onDelete: (part: PartDetail) => void;
  // onSell: (part: PartDetail) => void;
  setEditFormShow: (show: boolean) => void;
}

export interface SecondHeaderProps extends ScreenProps {
  title: string;
  titleColor?: string;
  btnTextColor?: string;
}

export interface SearchBarProps {
  title: string;
  value?: string;
  icon?: any;
  onPress: () => void;
  onChangeText?: (text: string) => void;
  onFocus: () => void;
}

export interface BottomSheetStockProps {
  item: PartDetail | undefined;
  stock: number;
  setStock: (stock: number) => void;
  onSave: (id: string) => void;
}

export interface PartListProps {
  handleItemPress: (value: PartDetail) => void;
  handleStockModalPress: (value: PartDetail) => void;
  data: PartDetail[];
}

export interface AwesomeAlertProps {
  show: boolean;
  title: string;
  message: string;
  progress: boolean;
  buttonConfirmText: string;
  buttonCancelText: string;
  buttonCancelColor: string;
  buttonConfirmColor: string;
  buttonConfirmShow: boolean;
  buttonCancelShow: boolean;
  buttonCancelFunction: () => void;
  buttonConfirmFunction: () => void;
}

export interface AlertCustomProps {
  option: AwesomeAlertProps;
}

export interface AddPartFormProps {
  title: string;
  children: React.ReactNode;
}
