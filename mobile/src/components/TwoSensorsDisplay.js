import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Activity from "../components/Activity";

const TwoSensorsDisplay = ({
  sensorType1,
  value1,
  unit1,
  time1,
  sensorType2,
  value2,
  unit2,
  time2,
}) => {

  return (
    <View style={styles.container}>
      {( () => {
        if (value1 === undefined) {
          return (
            <Text>sensor1 undefined</Text>
          );
        } else {
          return (
            <Text>{sensorType1}: {value1} {unit1}</Text>
          );
        }
      })};
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     {( () => {
  //       if (value1 === undefined) {
  //           return (
  //             <Activity title="Connecting to sensor1" />
  //           )
  //       } else {
  //         return (
  //         <View style={styles.row}>
  //           <Text style={styles.value}>
  //             {sensorType1}: {value1} {unit1}
  //           </Text>
  //           <Text style={styles.value}>{time1}</Text>
  //         </View>
  //       );
  //       }
  //     })()};
  //     <View style={styles.row}>
  //       <Text style={styles.value}>
  //         {sensorType2}: {value2} {unit2}
  //       </Text>
  //       <Text style={styles.value}>{time2}</Text>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 28,
  },
  titleRow: {
    flex: 1,
    marginTop: 45,
    alignSelf: 'center',
    fontSize: 24,
  },
  row: {
    // flex: 1,
    margin: 10,
    alignSelf: 'center',
  },
});

export default TwoSensorsDisplay;
