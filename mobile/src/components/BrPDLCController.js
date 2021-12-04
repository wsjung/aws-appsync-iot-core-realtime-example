import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';

// THIS IS FOR PUBLISHING
import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';

// import pubsub mqtt configs
import settings from '../amplify_pubsub_settings.json';

// Apply plugin with configuration
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: settings.region,
    aws_pubsub_endpoint: settings.endpoint,
  }),
);

var global_brightness = null;

function BrPDLCController({route}) {
  const [number, onChangeNumber] = useState(null);
  const [fixNumber, onChangeFixNumber] = useState(null);
  const [brightness, onChangeBrightness] = useState('N/A');
  const [isPrivacy, setIsPrivacy] = useState(false);
  const topic = route['params']['topic'];
  const method = route['params']['method'];
  const topic_mode = 'test-RN/set-mode';

  function textHandler(num) {
    onChangeNumber(num); // udpate textinput display

    const floatnum = parseFloat(num);
    floatnum > 100 ? onChangeFixNumber(100) : onChangeFixNumber(floatnum);
    // TODO: ADD ALERT IF VALUE OUT OF RANGE
  }

  async function publishBrightness(value) {
    const payload = {
      value_br: fixNumber,
      value_pdlc: 25,
      type: method == 'auto' ? 'userSetting' : method,
      privacy: value,
    };

    if (isNaN(fixNumber)) {
      console.log('input is NaN, not publishing');
    } else {
      console.log('publishing', payload, 'to ', topic);
      const pubsub_out = await PubSub.publish(topic, payload, {
        provider: 'AWSIoTProvider',
      });
      console.log('published, output: ', pubsub_out);
    }
  }

  async function publishMode() {

    const payload = {'mode': method};

    console.log('publishing', payload, "to ", topic_mode);
    const pubsub_out = await PubSub.publish(
      topic_mode,
      payload,
      {provider: 'AWSIoTProvider'},
    );
  };

  function submitHandler() {
    // on submit,
    onChangeBrightness(fixNumber); // (1) display the fixed brightness
    publishMode();
    publishBrightness(isPrivacy); // (2) publish to iot mqtt
  }

  function toggleSwitchAndPublish(value) {
    console.log('old value: ' + isPrivacy);
    console.log('new value: ' + value);
    setIsPrivacy(value);
    publishMode();
    publishBrightness(value);
  }

  return (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
    <View>
      <View style={{margin: 20, padding: 20}}>
        <Text style={styles.currBrText}>
          Brightness setting: {global_brightness}
        </Text>
      </View>
      <View
        style={{
          flex: 0,
          alignItems: 'center',
          height: 150,
          marginBottom: 100,
        }}>
        <View style={styles.row}>
          <Text style={styles.settingText}>Brightness</Text>
          <TextInput
            style={styles.input}
            onChangeText={num => textHandler(num)}
            onSubmitEditing={submitHandler}
            value={number}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.settingText}>Privacy</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isPrivacy ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchAndPublish}
            value={isPrivacy}
          />
        </View>
        <Button title="set" onPress={submitHandler} />
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  currBrText: {
    fontSize: 30,
  },
  settingText: {
    fontSize: 15,
    padding: 0,
    width: 75,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
  },
});

export default BrPDLCController;
