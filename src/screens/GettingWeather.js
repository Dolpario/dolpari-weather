import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
export default class GettingWeather extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Getting Weather...</Text>
                <View style={styles.padiingView}></View>
                <ActivityIndicator size="large" color="#0000ff"/>
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
    padiingView:{
        height:50,
    },
  
    loadingText: {
        fontSize: 38,
    }
})