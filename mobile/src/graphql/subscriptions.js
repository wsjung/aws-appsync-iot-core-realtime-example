/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSensorValue = /* GraphQL */ `
  subscription OnCreateSensorValue($sensorId: String!) {
    onCreateSensorValue(sensorId: $sensorId) {
      id
      sensorId
      value
      brightness
      temp
      humidity
      isWarning
      timestamp
      createdAt
      updatedAt
    }
  }
`;
