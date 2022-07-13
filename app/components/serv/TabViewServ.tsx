// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {FC, useCallback, useMemo, useState} from 'react';
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
  onQueue: (wo: IWorkOrder) => void;
  onProgress: (wo: IWorkOrder) => void;
  onDone: (wo: IWorkOrder) => void;
}

const TabViewServ: FC<TabViewServProps> = ({
  queues,
  progresses,
  dones,
  onQueue,
  onProgress,
  onDone,
}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'queue', title: 'Antrean'},
    {key: 'progress', title: 'Proses'},
    {key: 'done', title: 'Selesai'},
  ]);
  const handleOnQueue = useCallback(
    (wo: IWorkOrder) => {
      onQueue(wo);
    },
    [onQueue],
  );
  const handleOnProgress = useCallback(
    (wo: IWorkOrder) => {
      onProgress(wo);
    },
    [onProgress],
  );
  const handleOnDone = useCallback(
    (wo: IWorkOrder) => {
      onDone(wo);
    },
    [onDone],
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        queue: () => <QueueTab data={queues} onPressItem={handleOnQueue} />,
        progress: () => (
          <ProcessTab data={progresses} onPressItem={handleOnProgress} />
        ),
        done: () => <DoneTab data={dones} onPressItem={handleOnDone} />,
      }),
    [dones, handleOnDone, handleOnProgress, handleOnQueue, progresses, queues],
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
