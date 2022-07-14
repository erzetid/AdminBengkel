// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {color} from '../../constant/theme';
import {IServ, IWorkOrder} from '../../model/Serv';
import {PartDetail} from '../../screens/interface';
import Products, {IProduct} from './Products';
import DoneTab from './tab/DoneTab';
import ProcessTab from './tab/ProcessTab';
import QueueTab from './tab/QueueTab';
import TabSheet from './TabSheet';

interface TabViewServProps {
  queues: IWorkOrder[];
  progresses: IWorkOrder[];
  dones: IWorkOrder[];
  servs: IServ[];
  parts: PartDetail[];
  visibleTabSheet: boolean;
  onQueue: (wo: IWorkOrder) => void;
  onProgress: (wo: IWorkOrder) => void;
  onDone: (wo: IWorkOrder) => void;
  onChange: (wo: IWorkOrder) => void;
}

const TabViewServ: FC<TabViewServProps> = ({
  queues,
  progresses,
  dones,
  servs,
  parts,
  visibleTabSheet,
  onQueue,
  onProgress,
  onDone,
  onChange,
}) => {
  const layout = useWindowDimensions();
  const ref = useRef<BottomSheetModal>(null);
  const partsRef = useRef<PartDetail[]>([]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'queue', title: 'Antrean'},
    {key: 'progress', title: 'Proses'},
    {key: 'done', title: 'Selesai'},
  ]);
  const [workOrder, setWorkOrder] = useState<IWorkOrder>();
  const [textBtn, setTextBtn] = useState('');
  const closeSheet = useMemo(() => visibleTabSheet, [visibleTabSheet]);
  useEffect(() => {
    partsRef.current = parts;
  }, [parts]);

  useEffect(() => {
    if (closeSheet) {
      ref.current?.dismiss();
    }
  }, [closeSheet]);

  const openSheet = useCallback((wo: IWorkOrder) => {
    setWorkOrder(wo);
    ref.current?.present();
  }, []);

  const handleOnQueue = useCallback(
    (wo: IWorkOrder) => {
      openSheet(wo);
      setTextBtn('MULAI SERVIS');
    },
    [openSheet],
  );

  const handleOnProgress = useCallback(
    (wo: IWorkOrder) => {
      openSheet(wo);
      setTextBtn('BILLING');
    },
    [openSheet],
  );

  const handleOnDone = useCallback(
    (wo: IWorkOrder) => {
      onDone(wo);
    },
    [onDone],
  );

  const handleOnGetProducts = useCallback(
    (p: IProduct) => {
      if (workOrder) {
        const _wo = {...workOrder};
        const newWo = {..._wo, part: p.p, serv: p.s};
        setWorkOrder(newWo);
        onChange(newWo);
        const _parts = [...parts];
        const _p = _parts.filter(x => p.p.findIndex(i => i.id === x.id) < 0);
        partsRef.current = _p;
      }
    },
    [onChange, parts, workOrder],
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
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        sceneContainerStyle={{backgroundColor: color.white}}
      />
      <TabSheet
        ref={ref}
        data={workOrder}
        onQueue={() => workOrder && onQueue(workOrder)}
        onProgress={() => workOrder && onProgress(workOrder)}
        textBtn={textBtn}>
        <Products
          parts={partsRef.current}
          servs={servs}
          getProducts={handleOnGetProducts}
          product={{p: workOrder?.part || [], s: workOrder?.serv || []}}
        />
      </TabSheet>
    </>
  );
};

export default TabViewServ;
