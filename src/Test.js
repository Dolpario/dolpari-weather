import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { AreaChart, XAxis,LineChart } from 'react-native-svg-charts'
import {Circle, G} from 'react-native-svg'

import * as shape from 'd3-shape'


export default class test extends Component {

  render() {
    const data = [18, 20, 30, 40, 33, 42, 50]
    const month = ['Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const HorizontalLine = (({ y }) => (
      <Line
          key={ 'zero-axis' }
          x1={ '0%' }
          x2={ '100%' }
          y1={ y(50) }
          y2={ y(50) }
          stroke={ 'grey' }
          strokeDasharray={ [ 4, 8 ] }
          strokeWidth={ 2 }
      />
  ))

  const Tooltip = ({ x, y }) => (
      <G
          x={ x(5) - (75 / 2) }
          key={ 'tooltip' }
          onPress={ () => console.log('tooltip clicked') }
      >
          <G y={ 50 }>
              <Rect
                  height={ 40 }
                  width={ 75 }
                  stroke={ 'grey' }
                  fill={ 'white' }
                  ry={ 10 }
                  rx={ 10 }
              />
              <Text
                  x={ 75 / 2 }
                  dy={ 20 }
                  alignmentBaseline={ 'middle' }
                  textAnchor={ 'middle' }
                  stroke={ 'rgb(134, 65, 244)' }
              >
                  { `${data[5]}ºC` }
              </Text>
          </G>
          <G x={ 75 / 2 }>
              <Line
                  y1={ 50 + 40 }
                  y2={ y(data[ 5 ]) }
                  stroke={ 'grey' }
                  strokeWidth={ 2 }
              />
              <Circle
                  cy={ y(data[ 5 ]) }
                  r={ 6 }
                  stroke={ 'rgb(134, 65, 244)' }
                  strokeWidth={ 2 }
                  fill={ 'white' }
              />
          </G>
      </G>
  )

    return (
      <View>
        <XAxis
          style={{marginTop: 50}}
          data={data}
          formatLabel={(value, labelIndex) => month[labelIndex]}
          
          svg={{fontSize: 14, fill: 'white'}}
        />
        <LineChart
          style={{height: 200}}
          data={data}
          curve={shape.curveNatural}
          contentInset={{top: 30, bottom: 20, left: 25, right: 25}}
          svg={{stroke: '#f12711', strokeWidth:3 }}
        >
          <Tooltip />
        </LineChart>
      </View>
    )
  }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue'
    },
    HumidityFont: {
      fontSize: 20,
      marginLeft: 10
    },
  })