import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView } from 'react-native'
import Weathers from '../components/Weathers'
import Humidity from '../components/Humidity'
import Wind from '../components/Wind'
import TimeByTemp from '../components/TimeByTemp'
import MaxMinTemp from '../components/MaxMinTemp'

export default class WeatherContainer extends Component {
    constructor(props) {
        super(props)
      }
    render() {
        const {nowTemp,weatherCondition,city,humidity,wind,maxMinTemp,timeByTemp} = this.props
        const screenWidth = Dimensions.get('window').width;
        console.log(maxMinTemp)
        return (
            <View style={styles.container}>
                <View style={styles.IconContainer}>
                    <Weathers nowTemp={nowTemp} weatherCondition={weatherCondition} city={city}/>
                </View>
                <View style={styles.AddDataContainer}>
                    <View style={styles.SplitDataContainer} width={screenWidth}>
                        <Humidity humidity={humidity}/>
                        <Wind wind={wind}/>
                        <MaxMinTemp maxMinTemp={maxMinTemp}/>
                    </View>
                    <View style={styles.SplitDataContainer}>
                        <TimeByTemp timeByTemp={timeByTemp}/>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    IconContainer: {
        flex: 2,
        
    },
    AddDataContainer:{
        flex:1,
        backgroundColor: 'white'
    },
    SplitDataContainer:{
        flex:1,
        flexDirection: 'row',
    }
})