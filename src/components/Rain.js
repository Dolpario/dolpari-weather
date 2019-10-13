import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
export default class Rain extends Component {
    constructor(props) {
        super(props)
      }
    render() {

        return (
            <View style={styles.container}>
                <Icon name='cloud-rain' size={50}></Icon>
                <Text style={styles.RainFont}>{this.props.WeatherData.wind.speed}%</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    IconSize: {
        width: 40,
        height: 40,
    },
    RainFont:{
        fontSize: 20,
        marginLeft:10
    }, 
})