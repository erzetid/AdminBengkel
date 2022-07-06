// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../../../constant/theme';
import ItemTab, {ItemProps} from './ItemTab';

const ProcessItem: FC<ItemProps> = ({onPressItem, workOrder}) => {
  const totalTime = useMemo(
    () => workOrder.serv.reduce((a, b) => a + b.processTime, 0),
    [workOrder.serv],
  );
  const startTime = useMemo(() => workOrder.startTime, [workOrder.startTime]);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    let timerId: any;
    const start = (Date.now() - startTime) / 1000 / 60;
    setCountDown(Math.floor((totalTime - start) * 60));

    if (countDown > 0) {
      timerId = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [countDown, totalTime, startTime]);

  const seconds = useMemo(
    () => String(countDown % 60).padStart(2, '0'),
    [countDown],
  );
  const minutes = useMemo(
    () => String(Math.floor(countDown / 60)).padStart(2, '0'),
    [countDown],
  );

  return (
    <ItemTab onPressItem={onPressItem} workOrder={workOrder}>
      <Text style={styles.textRegular}>Sisa waktu</Text>
      <View style={styles.countDown}>
        <Icon name="ios-alarm" color={color.white} />
        <Text style={styles.textEstimate}>
          {countDown > 0 ? `${minutes}:${seconds}` : 'Waktu Habis'}
        </Text>
      </View>
    </ItemTab>
  );
};

export default ProcessItem;
const styles = StyleSheet.create({
  countDown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.red,
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  textEstimate: {
    color: color.white,
  },
  textRegular: {color: color.darkGray},
});
