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
export interface PartDetail {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  quantity: number;
  price: number;
  image: any;
  location: string;
}

export interface BottomSheetDetailProps extends ScreenProps {
  detail: PartDetail | undefined;
}

export interface SecondHeaderProps extends ScreenProps {
  title: string;
}

export interface SearchBarProps {
  title: string;
  onPress: () => void;
  onChangeText?: (text: string) => void;
}

export interface BottomSheetStockProps {
  item: PartDetail | undefined;
  stock: number;
  setStock: (stock: number) => void;
  onSave: (id: string) => void;
  onChangeText: (text: string) => void;
}

export interface PartListProps {
  handleItemPress: (value: PartDetail) => void;
  handleStockModalPress: (value: PartDetail) => void;
  data: PartDetail[];
}
