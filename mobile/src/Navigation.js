import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SensorScreen from './screens/SensorScreen';
import {View, Text, Button} from 'react-native';

const Navigation = () => {
  function HomeScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Sensors"
          onPress={() => navigation.navigate('Sensor')}
        />
        <Button
          title="Go to Energy Savings"
          onPress={() => navigation.navigate('EnergySavings')}
        />
      </View>
    );
  }

  function EnergySavings({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Energy Savings Screen</Text>
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

export default Navigation;
