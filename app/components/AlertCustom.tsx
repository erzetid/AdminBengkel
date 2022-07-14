// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {FC, useMemo} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {color} from '../constant/theme';
import {AlertCustomProps, AwesomeAlertProps} from '../screens/interface';

export const emptyAlert: AwesomeAlertProps = {
  show: false,
  title: '',
  message: '',
  progress: false,
  buttonConfirmText: '',
  buttonCancelText: '',
  buttonCancelColor: '#D0D0D0',
  buttonConfirmColor: '#DD6B55',
  buttonConfirmShow: false,
  buttonCancelShow: false,
  buttonCancelFunction: () => {},
  buttonConfirmFunction: () => {},
};

const AlertCustom: FC<AlertCustomProps> = ({option}) => {
  const alert = useMemo(() => {
    return {
      ...option,
    };
  }, [option]);

  return (
    <>
      <AwesomeAlert
        showProgress={alert.progress}
        title={alert.title}
        message={alert.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={alert.buttonCancelShow}
        showConfirmButton={alert.buttonConfirmShow}
        cancelText={alert.buttonCancelText}
        confirmText={alert.buttonConfirmText}
        confirmButtonColor={alert.buttonConfirmColor}
        cancelButtonColor={alert.buttonCancelColor}
        show={alert.show}
        onCancelPressed={alert.buttonCancelFunction}
        onConfirmPressed={alert.buttonConfirmFunction}
        progressSize={'large'}
        progressColor={color.lightPurple}
        // eslint-disable-next-line react-native/no-inline-styles
        messageStyle={{width: '100%', textAlign: 'center'}}
      />
    </>
  );
};

export default AlertCustom;
