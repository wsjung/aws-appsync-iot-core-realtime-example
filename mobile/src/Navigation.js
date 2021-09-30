import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SensorScreen from './screens/SensorScreen';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

// THIS IS FOR PUBLISHING
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-west-2',
  aws_pubsub_endpoint: 'wss:a82gcxlitg5l8-ats.iot.us-west-2.amazonaws.com/mqtt',
}));


const Navigation = () => {
  function HomeScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Smart Mixed-Lighting Control System</Text>
        <View style={{flex: 0.25}}></View>
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
      console.log("publishing", fixNumber);
      const pubsub_out = await PubSub.publish('test-RN/set-brightness', { value: fixNumber}, { provider: 'AWSIoTProvider' });
      console.log("published, output: ", pubsub_out);
    }

    function submitHandler() {
      // on submit, (1) display the fixed brightness (2) publish 
      onChangeBrightness(fixNumber);
      publishBrightness();
      // textHandler(number);
      // publishBrightness();
      
      //Auth.currentCredentials().then(info => {
      //  const cognitoIdentityId = info.identityId;
      //  console.log("############## COGNITO IDENTITY ID: ", cognitoIdentityId);
      //});
      // TODO: PUBLISH TO IOT TOPIC
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
      console.log("publishing", fixNumber);
      const pubsub_out = await PubSub.publish('test-RN/set-transparency', { value: fixNumber}, { provider: 'AWSIoTProvider' });
      console.log("published, output: ", pubsub_out);
    }

    function submitHandler() {
      // on submit, (1) display the fixed brightness (2) publish 
      onChangeTransparency(fixNumber);
      publishTransparency();
    }


    // TODO: ADD A CLEAR BUTTON
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