import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'

class DashboardInteractive extends React.PureComponent {

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

export default DashboardInteractive;