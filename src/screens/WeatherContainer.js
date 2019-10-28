import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import Weathers from '../components/Weathers'
import Humidity from '../components/Humidity'
import Wind from '../components/Wind'
import TimeByTemp from '../components/TimeByTemp'
import MaxMinTemp from '../components/MaxMinTemp'
import moment from 'moment'

export default class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowTemp: this.props.nowTemp,
            weatherCondition: this.props.weatherCondition,
            city: this.props.city,
            humidity: this.props.humidity,
            wind: this.props.wind,
            maxMinTemp: this.props.maxMinTemp,
            timeByTemp: this.props.timeByTemp
        }
        this.screenWidth = Dimensions.get('window').width;
    }

    async componentDidMount() {

        await this.cheackTemp(this.props.timeByTemp)

    }

    cheackTemp = (timeByTemp) => {

        if (this.props.timeCheck) {

            var flag = true
            timeByTemp.map(ele => {


                if (Number((moment(ele.dt_txt).format("H")) >= Number(moment().format("H"))) && flag) {

                    flag = false
                    this.setState({
                        nowTemp: ele.main.temp,
                        weatherCondition: ele.weather[0].description,
                        humidity: ele.main.humidity,
                        wind: ele.wind.speed
                    })
                }
            })
        }
    }

    render() {
        const { nowTemp, weatherCondition, city, humidity, wind, maxMinTemp, timeByTemp } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.IconContainer}>
                    <Weathers nowTemp={nowTemp} weatherCondition={weatherCondition} city={city} />
                </View>
                <View style={styles.AddDataContainer}>
                    <View style={styles.SplitDataContainer} width={this.screenWidth}>
                        <Humidity humidity={humidity} />
                        <Wind wind={wind} />
                        <MaxMinTemp maxMinTemp={maxMinTemp} />
                    </View>
                    <View style={styles.SplitDataContainer}>
                        <TimeByTemp timeByTemp={timeByTemp} />
                    </View>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AbsoluteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    IconContainer: {
        flex: 2,

    },
    AddDataContainer: {
        flex: 1,

    },
    SplitDataContainer: {
        flex: 1,
        flexDirection: 'row',
    }
})
