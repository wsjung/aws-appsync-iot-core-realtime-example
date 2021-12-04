import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

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
)

var global_transparency = null;;

function PDLCController({route}) {
  const [number, onChangeNumber] = useState(null);
  const [fixNumber, onChangeFixNumber] = useState(null);
  const [transparency, onChangeTransparency] = useState('N/A');
  const topic = route['params']['topic'];
  const method = route['params']['method'];
  const topic_mode = 'test-RN/set-mode';

  function textHandler(num) {
    onChangeNumber(num); // udpate textinput display

    const floatnum = parseFloat(num);
    floatnum > 100 ? onChangeFixNumber(100) : onChangeFixNumber(floatnum);
    // TODO: ADD ALERT IF VALUE OUT OF RANGE
  }

  async function publishTransparency() {
    if (isNaN(fixNumber)) {
      console.log('input is NaN, not publishing');
    } else {
      console.log('publishing', fixNumber, "to ", topic);
      const pubsub_out = await PubSub.publish(
        topic,
        {value: fixNumber, type: method,},
        {provider: 'AWSIoTProvider'},
      );
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
    onChangeTransparency(fixNumber); // (1) display the fixed brightness
    global_transparency = fixNumber;
    publishMode();
    publishTransparency(); // (2) publish to iot mqtt
  }

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={{margin: 40, padding: 40}}>
        <Text style={styles.currBrText}>
          Currently set transparency: {global_transparency}
        </Text>
      </View>
      <Text style={styles.setBrText}>Set transparency:</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={num => textHandler(num)}
          onSubmitEditing={submitHandler}
          value={number}
          keyboardType="numeric"
        />
        <Button title="set" onPress={submitHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  currBrText: {
    fontSize: 20,
  },
  setBrText: {
    fontSize: 15,
  },
});

export default PDLCController;