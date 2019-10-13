import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class MaxMinTemp extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const minTemp = this.props.maxMinTemp[0];
        const maxTemp = this.props.maxMinTemp[1];
        return (
            <View style={styles.container}>
                <Icon name='thermometer-three-quarters' size={50}></Icon>
                <Text style={styles.MaxMinTempFont}>{Math.round(minTemp)}º/{Math.round(maxTemp)}º</Text>
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
    MaxMinTempFont: {
        fontSize: 20,
        marginLeft: 10
    },
})
