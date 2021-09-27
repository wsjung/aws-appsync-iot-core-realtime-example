import {AppRegistry} from 'react-native';
import Amplify from 'aws-amplify';

import App from './App';
import {name as appName} from './app.json';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
});
