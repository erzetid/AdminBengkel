/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import App from './app/router.tsx';

AppRegistry.registerComponent(appName, () => App);
