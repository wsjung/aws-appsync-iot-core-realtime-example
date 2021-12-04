import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SensorGauge = ({sensorType, value, time, unit}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.value}>
        {sensorType}: {value}
      </Text>
      <Text style={styles.value}>{time}</Text>
    </View>
  );
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

export default SensorGauge;
