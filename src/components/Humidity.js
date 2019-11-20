import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Humidity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { humidity,isBlack } = this.props;
        return (
            <View style={styles.container}>
                <Icon name='water-percent' size={50} color={this.props.isBlack?'black':'white'}></Icon>
                <Text style={isBlack?BHumidityFont:styles.HumidityFont}>{ humidity }%</Text>
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
    HumidityFont: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    BHumidityFont: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black'
    },
})
