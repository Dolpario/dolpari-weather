import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default class Wind extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { wind,isBlack } = this.props;
        return (
            <View style={styles.container}>
                <Icon name='wind' size={50} color={isBlack?'black':'white'}></Icon>
                <Text style={isBlack?styles.BWindFont:styles.WindFont}>{`${wind}m/s`}</Text>
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
        width: 40,
        height: 40,
        
    },
    WindFont: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    BWindFont: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
})
