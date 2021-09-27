import React from 'react';
import {View, StyleSheet, Text } from 'react-native';


const SensorGauge = ({temp, humidity, time}) => {

  return (
    <View style={styles.container}>
      {/* <View style={styles.titleRow}>
        <Text style={styles.title}>{sensorType}</Text>
      </View> */}
      {/* <View style={styles.row}>
        <Speedometer 
              value={value} 
              totalValue={100} 
              showIndicator
              outerColor="#d3d3d3"
              internalColor={gaugeColor} 
          />
      </View> */}
      <View style={styles.sensorRow}>
        {/* <Text style={styles.value}>{sensorType}: {value} C</Text> */}
        <Text style={styles.value}>Temp: {temp} C</Text>
        <Text style={styles.value}>Humidity: {humidity}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{time}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize:32,
        fontWeight:'bold'
    },
    value: {
        fontSize:45
    },
    sensorRow: {
        flex: 1,
        marginTop: 45,
        alignSelf: 'center',
        fontSize:24
    },
    row: {
        flex: 1,
        alignSelf: 'center'
    }
});

export default SensorGauge;
