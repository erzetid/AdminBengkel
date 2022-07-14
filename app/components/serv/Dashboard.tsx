// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../../constant/theme';

interface Dashboard {
  queue: number;
  progress: number;
  done: number;
}

const Dashboard: FC<Dashboard> = ({queue, progress, done}) => {
  const queueText = useMemo(() => queue, [queue]);
  const progressText = useMemo(() => progress, [progress]);
  const doneText = useMemo(() => done, [done]);
  return (
    <View style={styles.board}>
      <View style={styles.boardQueue}>
        <Text style={styles.textBoard}>Antrean</Text>
        <Text style={styles.amountBoard}>
          <Icon name="ios-stats-chart" size={18} /> {queueText}
        </Text>
      </View>
      <View style={styles.boardProgress}>
        <Text style={styles.textBoard}>Proses</Text>
        <Text style={styles.amountBoard}>
          <Icon name="ios-bicycle" size={18} /> {progressText}
        </Text>
      </View>
      <View style={styles.boardDone}>
        <Text style={styles.textBoard}>Selesai</Text>
        <Text style={styles.amountBoard}>
          <Icon name="ios-checkmark-done" size={18} /> {doneText}
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  board: {flexDirection: 'row', justifyContent: 'space-between'},
  boardQueue: {
    flexGrow: 1,
    backgroundColor: color.red,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  boardProgress: {
    flexGrow: 1,
    backgroundColor: color.lightBlue,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  boardDone: {
    flexGrow: 1,
    marginVertical: 5,
    backgroundColor: color.green,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 2,
  },
  textBoard: {color: color.white, fontWeight: 'bold'},
  amountBoard: {color: color.white, fontSize: 20},
});
