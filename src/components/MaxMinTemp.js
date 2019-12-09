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
        const {isBlack} = this.props;
        return (
            <View style={styles.container}>
                <Icon name='thermometer-three-quarters' size={50} color={this.props.isBlack?'black':'white'}></Icon>
                <Text style={isBlack?styles.BMaxMinTempFont:styles.MaxMinTempFont}>{Math.round(minTemp)}º/{Math.round(maxTemp)}º</Text>
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
        marginLeft: 10,
        color: 'white'
    },
    BMaxMinTempFont: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black'
    },
})
