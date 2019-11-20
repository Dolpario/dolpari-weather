import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default class Weathers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { nowTemp, weatherCondition, city ,isBlack} = this.props;
        return (
            <View style={styles.container}>
                {/* <Icon name="cloud" size={100}></Icon>   */}
                <Text style={[styles.TempFont, { color: isBlack ? 'black' : 'white' }]}>{nowTemp && Math.round(nowTemp)}º</Text>
                {/* <Text style={styles.TempMaxMinFont}>{this.props.WeatherData.weather[0].main}</Text> */}
                <Text style={{ padding: 20 }}></Text>
                <Text style={[styles.TempDescription, { color: isBlack ? 'black' : 'white' }]}>{weatherCondition}</Text>
                <Text style={[styles.TempDescription, { color: isBlack ? 'black' : 'white' }]}>{city}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    IconSize: {
        width: 50,
        height: 50
    },
    TempFont: {
        fontSize: 50,
        color: 'white'
    },
    TempMaxMinFont: {
        marginTop: 10,
        fontSize: 20,
        color: 'white'
    },
    TempDescription:
    {
        fontSize: 20,
        color: 'white'
    }
})
