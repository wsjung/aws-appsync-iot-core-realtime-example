import {API, graphqlOperation} from 'aws-amplify';
import {getSensor} from '../graphql/queries';

export const GetSensor = async sensorId => {
    const response = await API.graphql(graphqlOperation(getSensor, {sensorId: sensorId}),
    );
    if (response.data && response.data.getSensor) {
        return response.data.getSensor;
    }
    else {
      return null;
    }
}

export const GetSensorStatusColor = (isWarning) => {
    
    if (isWarning) {
        return "red"
    } else {
      return "green"
    }
}
