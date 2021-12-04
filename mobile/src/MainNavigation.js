import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';

const MainNavigation = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" keyboardType="numeric" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
    marginBottom: 50,
  }
});

export default MainNavigation;

// import React, {useState, useEffect} from 'react';
// import {API, graphqlOperation} from 'aws-amplify';
// import {GetSensor} from '../api/Sensors';
// import {onCreateSensorValue} from '../graphql/subscriptions';

// import SensorGauge from '../components/SensorGauge';
// import Activity from '../components/Activity';
// import {View, StyleSheet, KeyboardAvoidingView, Keyboard} from 'react-native';
// import BrPDLCController from '../components/BrPDLCController';

// import settings from '../settings.json';
// import pubsub_settings from '../amplify_pubsub_settings.json';

// const AutoController = () => {
//   const sensorIdTe = settings.tempSensorId;
//   const sensorIdBr = settings.brightnessSensorId;

//   const [sensorTe, setSensorTe] = useState({});
//   const [sensorValueTe, setSensorValueTe] = useState({});
//   const [readyToSubscribeTe, setReadyToSubscribeTe] = useState(false);

//   const [sensorBr, setSensorBr] = useState({});
//   const [sensorValueBr, setSensorValueBr] = useState({});
//   const [readyToSubscribeBr, setReadyToSubscribeBr] = useState(false);

//   //fetch sensor
//   useEffect(() => {
//     const initSensorTe = async () => {
//       console.log('fetching sensor');

//       try {
//         const response = await GetSensor(sensorIdTe);

//         if (response) {
//           setSensorTe(response);
//           console.log('sensor retrived');
//           setReadyToSubscribeTe(true);
//         }
//       } catch (error) {
//         console.log('error fetching sensor', error);
//       }
//     };

//     initSensorTe();
//   }, [sensorIdTe]);

//   //fetch sensor
//   useEffect(() => {
//     const initSensorBr = async () => {
//       console.log('fetching sensor');

//       try {
//         const response = await GetSensor(sensorIdBr);

//         if (response) {
//           setSensorBr(response);
//           console.log('sensor retrived');
//           setReadyToSubscribeBr(true);
//         }
//       } catch (error) {
//         console.log('error fetching sensor', error);
//       }
//     };

//     initSensorBr();
//   }, [sensorIdBr]);

//   //subscribe to changes in sensor values
//   useEffect(() => {
//     if (readyToSubscribeTe) {
//       console.log('start subscription to sensor');

//       const subscriber = API.graphql(
//         graphqlOperation(onCreateSensorValue, {sensorId: sensorIdTe}),
//       ).subscribe({
//         next: response => {
//           //update the sensor's status in state
//           if (response.value.data.onCreateSensorValue) {
//             setSensorValueTe(response.value.data.onCreateSensorValue);
//           }
//         },
//         error: error => {
//           console.log('error on sensor subscription', error);
//         },
//       });

//       return () => {
//         console.log('terminating subscription to sensor');
//         subscriber.unsubscribe();
//       };
//     }
//   }, [readyToSubscribeTe, sensorIdTe]);

//   //subscribe to changes in sensor values
//   useEffect(() => {
//     if (readyToSubscribeBr) {
//       console.log('start subscription to sensor');

//       const subscriber = API.graphql(
//         graphqlOperation(onCreateSensorValue, {sensorId: sensorIdBr}),
//       ).subscribe({
//         next: response => {
//           //update the sensor's status in state
//           if (response.value.data.onCreateSensorValue) {
//             setSensorValueBr(response.value.data.onCreateSensorValue);
//           }
//         },
//         error: error => {
//           console.log('error on sensor subscription', error);
//         },
//       });

//       return () => {
//         console.log('terminating subscription to sensor');
//         subscriber.unsubscribe();
//       };
//     }
//   }, [readyToSubscribeBr, sensorIdBr]);

//   return sensorValueTe.value === undefined ||
//     sensorValueBr.value === undefined ? (
//     <KeyboardAvoidingView behavior="padding" style={styles.containerOuter}>
//       <Activity title="Connecting to Sensors" />
//       <BrPDLCController
//         route={{
//           params: {topic: pubsub_settings.test_auto_topic, method: 'auto'},
//         }}
//       />
//       {/* <View style={{ height:60 }}/> */}
//     </KeyboardAvoidingView>
//   ) : (
//     <KeyboardAvoidingView behavior="padding" style={styles.containerOuter}>
//       <View style={{backgroundColor: '#ffffff', margin:50}}>
//         <SensorGauge
//           sensorType={sensorBr.sensorType}
//           value={parseInt(sensorValueBr.value / 10)}
//           unit={'C'}
//           time={new Date(sensorValueBr.timestamp).toLocaleTimeString()}
//         />
//         <SensorGauge
//           sensorType={sensorTe.sensorType}
//           value={sensorValueTe.value}
//           unit={'C'}
//           time={new Date(sensorValueTe.timestamp).toLocaleTimeString()}
//         />
//       </View>
//       <View
//         style={{backgroundColor: '#ffffff', flex: 1, justifyContent: 'center'}}>
//         <BrPDLCController
//           route={{
//             params: {topic: pubsub_settings.test_auto_topic, method: 'auto'},
//           }}
//         />
//         {/* <View style={{ height: 60 }}/> */}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   containerOuter: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     marginTop: 10,
//     justifyContent: 'flex-end',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     margin: 0,
//     justifyContent: 'center',
//   },
// });

// export default AutoController;
