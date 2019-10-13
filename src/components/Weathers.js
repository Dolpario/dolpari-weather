import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default class Weathers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { nowTemp, weatherCondition, city } = this.props;
        return (
            <View style={styles.container}>
                {/* <Icon name="cloud" size={100}></Icon>   */}
                <Text style={styles.TempFont}>{nowTemp && Math.round(nowTemp)}º</Text>
                {/* <Text style={styles.TempMaxMinFont}>{this.props.WeatherData.weather[0].main}</Text> */}
                <Text style={{ padding: 20 }}></Text>
                <Text style={styles.TempDescription}>{weatherCondition}</Text>
                <Text style={styles.TempDescription}>{city}</Text>
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
        fontSize: 50
    },
    TempMaxMinFont: {
        marginTop: 10,
        fontSize: 20
    },
    TempDescription:
    {
        fontSize: 20
    }
})
