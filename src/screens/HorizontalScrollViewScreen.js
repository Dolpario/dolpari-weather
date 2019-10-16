import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native'
import WeatherContainer from './WeatherContainer'

export default class HorizontalScrollViewScreen extends Component {

    constructor(props) {
        super(props)
        this.screenWidth = Dimensions.get('window').width;
        // console.log("daylist")
        // console.log(this.props.dayList)
    }

    render() {
        const { WeatherData, city, todayTimeByTemp, dayList, maxMinTemp, daydtList } = this.props
        const todayMaxMintemp = [WeatherData.main.temp_min, WeatherData.main.temp_max]
        const dayListKey = Object.keys(dayList)

        return (
            <ScrollView horizontal={true} pagingEnabled={true}>
                <View style={styles.mainView}>
                    <View style={styles.container} width={this.screenWidth}>
                        <WeatherContainer
                            nowTemp={WeatherData.main.temp}
                            weatherCondition={WeatherData.weather[0].description}
                            city={city}
                            humidity={WeatherData.main.humidity}
                            wind={WeatherData.wind.speed}
                            maxMinTemp={todayMaxMintemp}
                            timeByTemp={todayTimeByTemp}
                            timeCheack={false} />
                        {/* <WeatherContainer nowTemp={} weatherCondition={} city={} humidity={} wind={}  maxMinTemp={} timeByTemp={} /> */}
                    </View>
                    {dayListKey.map((ele, index) => {
                        return (<View style={styles.container} width={this.screenWidth} key={index}>
                            <WeatherContainer
                                nowTemp={null}
                                weatherCondition={null}
                                city={city}
                                humidity={null}
                                wind={null}
                                maxMinTemp={maxMinTemp[ele]}
                                timeByTemp={daydtList[ele]}
                                timeCheck={true} />
                        </View>)
                    })}



                </View>
            </ScrollView>

        );
    };
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

})
