import React from 'react';
import {View, StyleSheet, Text } from 'react-native';

const SensorGauge = ({brightness, temp, humidity, time}) => {

  const temp_F = temp * 9 / 5 + 32;

  return (
    <View style={styles.container}>
      <View style={styles.sensorRow}>
        <Text style={styles.value}>Brightness: {brightness}</Text>
        <Text style={styles.value}>Temp: {temp_F}°F</Text>
        <Text style={styles.value}>Humidity: {humidity}%</Text> 
      </View>
      <View style={styles.row}>
        <Text style={styles.updatetime}>Last updated: {time}</Text>
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
        fontSize:35
    },
    updatetime: {
      fontSize:20
    },
    sensorRow: {
        flex: 1,
        marginTop: 45,
        alignSelf: 'center',
        // fontSize:24
    },
    row: {
        flex: 1,
        alignSelf: 'center'
    }
});

export default SensorGauge;
