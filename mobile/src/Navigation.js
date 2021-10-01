import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SensorScreen from './screens/SensorScreen';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

// THIS IS FOR PUBLISHING
import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';

// import pubsub mqtt configs
import settings from './amplify_pubsub_settings.json';

// Apply plugin with configuration
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: settings.region,
    aws_pubsub_endpoint: settings.endpoint,
  }),
);

const Navigation = () => {
  function HomeScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Smart Mixed-Lighting Control System</Text>
        <View style={{flex: 0.25}} />
        <Button
          title="Sensor Data Panel"
          onPress={() => navigation.navigate('Sensor')}
        />
        <Button
          title="Brightness Control Interface"
          onPress={() => navigation.navigate('BrightnessControl')}
        />
        <Button
          title="PDLC Control Interface"
          onPress={() => navigation.navigate('PDLCControl')}
        />
        <Button
          title="Dashboard"
          onPress={() => navigation.navigate('EnergySavings')}
        />
      </View>
    );
  }

  function EnergySavings({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Dashboard Screen</Text>
      </View>
    );
  }

  function PDLCControl({navigation}) {
    const [number, onChangeNumber] = useState(null);
    const [fixNumber, onChangeFixNumber] = useState(null);
    const [transparency, onChangeTransparency] = useState('N/A');

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
        console.log('publishing', fixNumber);
        const pubsub_out = await PubSub.publish(
          settings.transparency_topic,
          {value: fixNumber},
          {provider: 'AWSIoTProvider'},
        );
        console.log('published, output: ', pubsub_out);
      }
    }

    function submitHandler() {
      // on submit,
      onChangeTransparency(fixNumber); // (1) display the fixed brightness
      publishTransparency(); // (2) publish to iot mqtt
    }

    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={{margin: 40, padding: 40}}>
          <Text style={styles.currBrText}>
            Currently set transparency: {transparency}
          </Text>
        </View>
        <Text style={styles.setBrText}>Set transparency:</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={num => textHandler(num)}
            onSubmitEditing={submitHandler}
            value={number}
            // maxLength={4}
            keyboardType="numeric"
          />
          <Button title="set" onPress={submitHandler} />
          {/* <TouchableHighlight onPress={submitHandler}>
            <Text>Set</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
  }

  function BrightnessControl({navigation}) {
    const [number, onChangeNumber] = useState(null);
    const [fixNumber, onChangeFixNumber] = useState(null);
    const [brightness, onChangeBrightness] = useState('N/A');

    function textHandler(num) {
      onChangeNumber(num); // udpate textinput display

      const floatnum = parseFloat(num);
      floatnum > 100 ? onChangeFixNumber(100) : onChangeFixNumber(floatnum);
      // TODO: ADD ALERT IF VALUE OUT OF RANGE
    }

    async function publishBrightness() {
      if (isNaN(fixNumber)) {
        console.log('input is NaN, not publishing');
      } else {
        console.log('publishing', fixNumber);
        const pubsub_out = await PubSub.publish(
          settings.brightness_topic,
          {value: fixNumber},
          {provider: 'AWSIoTProvider'},
        );
        console.log('published, output: ', pubsub_out);
      }
    }

    function submitHandler() {
      // on submit,
      onChangeBrightness(fixNumber); // (1) display the fixed brightness
      publishBrightness(); // (2) publish to iot mqtt
    }

    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={{margin: 40, padding: 40}}>
          <Text style={styles.currBrText}>
            Currently set brightness: {brightness}
          </Text>
        </View>
        <Text style={styles.setBrText}>Set brightness:</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={num => textHandler(num)}
            onSubmitEditing={submitHandler}
            value={number}
            // maxLength={4}
            keyboardType="numeric"
          />
          <Button title="set" onPress={submitHandler} />
          {/* <TouchableHighlight onPress={submitHandler}>
            <Text>Set</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#232F3E',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EnergySavings" component={EnergySavings} />
        <Stack.Screen name="PDLCControl" component={PDLCControl} />
        <Stack.Screen name="BrightnessControl" component={BrightnessControl} />
        <Stack.Screen
          name="Sensor"
          component={SensorScreen}
          options={{
            title: 'Sensor monitor',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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

export default Navigation;
