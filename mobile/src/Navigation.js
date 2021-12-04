import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SensorScreen from './screens/SensorScreen';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import BrightnessController from './components/BrightnessController';
import PDLCController from './components/PDLCController';
import Dashboard from './components/Dashboard';

// THIS IS FOR PUBLISHING
import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';

// import pubsub mqtt configs
import settings from './amplify_pubsub_settings.json';
import AutoController from './screens/AutoController';
import MainNavigation from './MainNavigation';

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
          title="Test"
          onPress={() => navigation.navigate('MainNavigation')}
        />
        <Button
          title="Auto Control"
          onPress={() => navigation.navigate('AutoController')}
        />
        <Button
          title="Sensor Monitor"
          onPress={() => navigation.navigate('Sensor')}
        />
        <Button
          title="Brightness Control Interface"
          onPress={() => navigation.navigate('BrightnessController')}
        />
        <Button
          title="PDLC Control Interface"
          onPress={() => navigation.navigate('PDLCController')}
        />
        <Button
          title="Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    );
  };


  function EnergySavings({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Dashboard Screen</Text>
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
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
        <Stack.Screen name="AutoController" component={AutoController} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="PDLCController"
          component={PDLCController}
          initialParams={{
            topic: settings.transparency_topic,
            method: 'manual',
          }}
        />
        <Stack.Screen
          name="BrightnessController"
          component={BrightnessController}
          initialParams={{
            topic: settings.brightness_topic,
            method: 'manual',
          }}
        />
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
