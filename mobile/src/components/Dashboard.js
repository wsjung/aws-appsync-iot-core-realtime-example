import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'

class Dashboard extends React.PureComponent {

    render() {

        const data_LED = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, 85, 91 ]
        const data_PDLC = [ -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18, -40, -61, 16, 62, 20, -93, -54, 47 ]
        const data_sunlight = [ 95, -4, -24, 85, 91, 35, -69, 92, -40, -54, 47, -89, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24 ]
        //Array of datasets, following this syntax:
        const data_controls = [
            {
                data: data_LED,
                svg: { stroke: 'green' },
            },
            {
                data: data_PDLC,
                svg: { stroke: 'blue' },
            },
        ]
        const data_sun = [
          {
            data: data_sunlight,
            svg: {stroke: 'red'},
          }
        ]
        const data_full = [
          {
              data: data_LED,
              svg: { stroke: 'green' },
          },
          {
              data: data_PDLC,
              svg: { stroke: 'blue' },
          },
          {
            data: data_sunlight,
            svg: {stroke: 'red'},
          }
      ]

        const xAxisHeight = 30
        const verticalContentInset = { top: 10, bottom: 10 }
        const axesSvg = { fontSize: 10, fill: 'grey'}


        return (
          <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
            <YAxis
              data={data_LED.concat(data_PDLC)}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={data_full}
                contentInset={verticalContentInset}
                // svg={{ stroke: 'blue' }}
              >
                <Grid/>
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={data_LED}
                formatLabel={(v1, idx1) => v1}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
              />
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    margin:10,
    padding:10,
    flex: 1,
    flexDirection: "column",
    // alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    flexDirection: "column",
    flex: 4,

  },  
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    textAlign: 'center',
  },
});

export default Dashboard;


// const Dashboard = () => {
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
//       sensorValueBr.value === undefined ? (
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <Activity title="Connecting to Sensors" />
//         <BrPDLCController route={{'params':{'topic':pubsub_settings.test_auto_topic, 'method':'auto'}}}/>
//         <View style={{ height:60 }}/>
//       </KeyboardAvoidingView>
//       ) :(
//         <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <View style={styles.container}>
//           <SensorGauge
//             sensorType={sensorBr.sensorType}
//             value={parseInt(sensorValueBr.value / 10)}
//             unit={'C'}
//             time={new Date(sensorValueBr.timestamp).toLocaleTimeString()}
//           />
//           <SensorGauge
//             sensorType={sensorTe.sensorType}
//             value={sensorValueTe.value}
//             unit={'C'}
//             time={new Date(sensorValueTe.timestamp).toLocaleTimeString()}
//           />
//         </View>
//           <BrPDLCController route={{'params':{'topic':pubsub_settings.test_auto_topic, 'method':'auto'}}}/>
//           <View style={{ height: 60 }}/>
//         </KeyboardAvoidingView>
//     ); 
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
// });

// export default Dashboard;