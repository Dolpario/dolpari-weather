import React, { Component } from 'react';
import { StyleSheet, View,Dimensions,ScrollView,Text} from 'react-native'
import WeatherContainer from './WeatherContainer'

export default class HorizontalScrollViewScreen extends Component {

    constructor(props) {
        super(props)

        this.screenWidth = Dimensions.get('window').width;
      }

    render() {    
        const { WeatherData, city, todayTimeByTemp } = this.props
        const todayMaxMintemp =[WeatherData.main.temp_min, WeatherData.main.temp_max]
        return (
            <ScrollView horizontal={true} pagingEnabled={true}>
                <View style={styles.container} width={this.screenWidth}>
                    <WeatherContainer
                        nowTemp={WeatherData.main.temp}
                        weatherCondition={WeatherData.weather[0].description}
                        city={city}
                        humidity={WeatherData.main.humidity}
                        wind={WeatherData.wind.speed}
                        maxMinTemp={todayMaxMintemp}
                        timeByTemp={todayTimeByTemp} />
                    {/* <WeatherContainer nowTemp={} weatherCondition={} city={} humidity={} wind={}  maxMinTemp={} timeByTemp={} /> */}
                </View>
                <View style={styles.container} width={this.screenWidth}>
                    <Text>Test2</Text>
                </View>
                <View style={styles.container} width={this.screenWidth}>
                    <Text>Test3</Text>
                </View>
            </ScrollView>
           
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato'
    },
   
})
