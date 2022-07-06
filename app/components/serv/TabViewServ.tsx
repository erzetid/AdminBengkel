// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Category, CategoryServ, ImagePart} from '../../constant/enum';
import {color} from '../../constant/theme';
import {IWorkOrder} from '../../model/Serv';
import DoneTab from './tab/DoneTab';
import ProcessTab from './tab/ProcessTab';
import QueueTab from './tab/QueueTab';
const woData: IWorkOrder[] = [
  {
    id: '1',
    queue: 'S002',
    time: 1657027842104,
    vehicle: {
      brand: 'Honda',
      model: 'Beat 110',
      plate: 'H2525KK',
      registrationNumber: 'JMK0025',
      year: 2020,
      id: 'v01',
    },
    customer: {
      address: 'Sawojajar, Wanasari, Brebes',
      name: 'Susilo Bambang Sadewo',
      no: `${Date.now()}`,
      phone: '859666666',
      vehicle: [],
      id: 'C1',
    },
    analysis: 'Cek busi',
    complaint: 'Motor mogok',
    doneTime: 0,
    startTime: 1657044699646,
    mechanic: '',
    part: [
      {
        buyPrice: 5000,
        category: Category.ELECTRICAL,
        code: 'P-005-45',
        description: '',
        image: ImagePart.BRAKE,
        location: 'A1.2.2',
        name: 'Rem depan',
        price: 10000,
        quantity: 1,
      },
    ],
    serv: [
      {
        category: CategoryServ.LIGHT_REPAIR,
        code: 'LR01',
        description: 'Ganti lampu',
        name: 'Ganti Lampu',
        price: 5000,
        processTime: 15,
      },
    ],
  },
  {
    id: '2',
    queue: 'S002',
    time: 1657027842104,
    vehicle: {
      brand: 'Honda',
      model: 'Beat 110',
      plate: 'H2525KK',
      registrationNumber: 'JMK0025',
      year: 2020,
      id: 'v01',
    },
    customer: {
      address: 'Sawojajar, Wanasari, Brebes',
      name: 'Susilo Bambang Sadewo',
      no: `${Date.now()}`,
      phone: '859666666',
      vehicle: [],
      id: 'C1',
    },
    analysis: 'Cek busi',
    complaint: 'Motor mogok',
    doneTime: 0,
    startTime: Date.now(),
    mechanic: '',
    part: [
      {
        buyPrice: 5000,
        category: Category.ELECTRICAL,
        code: 'P-005-45',
        description: '',
        image: ImagePart.BRAKE,
        location: 'A1.2.2',
        name: 'Rem depan',
        price: 10000,
        quantity: 1,
      },
    ],
    serv: [
      {
        category: CategoryServ.LIGHT_REPAIR,
        code: 'LR01',
        description: 'Ganti lampu',
        name: 'Ganti Lampu',
        price: 5000,
        processTime: 0.5,
      },
    ],
  },
];
const TabViewServ = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'queue', title: 'Antrean'},
    {key: 'progress', title: 'Proses'},
    {key: 'done', title: 'Selesai'},
  ]);
  const queues = useMemo(() => woData, []);
  const handleOnQueue = (wo: IWorkOrder) => {
    console.log(wo);
  };

  const renderScene = useMemo(
    () =>
      SceneMap({
        queue: () => <QueueTab data={queues} onPressItem={handleOnQueue} />,
        progress: () => (
          <ProcessTab data={queues} onPressItem={handleOnQueue} />
        ),
        done: () => <DoneTab data={queues} onPressItem={handleOnQueue} />,
      }),
    [queues],
  );
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color.lightPurple}}
      style={{backgroundColor: color.white}}
      labelStyle={{color: color.darkGray}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      sceneContainerStyle={{backgroundColor: color.white}}
    />
  );
};

export default TabViewServ;
