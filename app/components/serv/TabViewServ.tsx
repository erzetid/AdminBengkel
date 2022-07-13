// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {color} from '../../constant/theme';
import {IWorkOrder} from '../../model/Serv';
import DoneTab from './tab/DoneTab';
import ProcessTab from './tab/ProcessTab';
import QueueTab from './tab/QueueTab';

interface TabViewServProps {
  queues: IWorkOrder[];
  progresses: IWorkOrder[];
  dones: IWorkOrder[];
}

const TabViewServ: FC<TabViewServProps> = ({queues, progresses, dones}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'queue', title: 'Antrean'},
    {key: 'progress', title: 'Proses'},
    {key: 'done', title: 'Selesai'},
  ]);
  const handleOnQueue = (wo: IWorkOrder) => {
    console.log(wo);
  };

  const renderScene = useMemo(
    () =>
      SceneMap({
        queue: () => <QueueTab data={queues} onPressItem={handleOnQueue} />,
        progress: () => (
          <ProcessTab data={progresses} onPressItem={handleOnQueue} />
        ),
        done: () => <DoneTab data={dones} onPressItem={handleOnQueue} />,
      }),
    [dones, progresses, queues],
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
