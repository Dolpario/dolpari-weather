import React, { Component } from 'react';
import { StyleSheet, View,Dimensions,ScrollView,Text} from 'react-native'
import WeatherContainer from './WeatherContainer'


export default class HorizontalScrollViewScreen extends Component {

    constructor(props) {
        super(props)
      }

    render() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        
        const {WeatherData,dayList,maxMinTemp,city,daydtList,timeByTemp,todayTimeByTemp} = this.props
        const todayMaxMintemp =[WeatherData.main.temp_min,WeatherData.main.temp_max]
        return (
            <ScrollView horizontal={true} pagingEnabled={true}>
                <View style={styles.container} width={screenWidth}>
                    <WeatherContainer nowTemp={WeatherData.main.temp} weatherCondition={WeatherData.weather[0].description} city={city} humidity={WeatherData.main.humidity} wind={WeatherData.wind.speed}  maxMinTemp={todayMaxMintemp} timeByTemp={todayTimeByTemp} />
                    {/* <WeatherContainer nowTemp={} weatherCondition={} city={} humidity={} wind={}  maxMinTemp={} timeByTemp={} /> */}
                </View>
                <View style={styles.container} width={screenWidth}>
                    <Text>Test2</Text>
                </View>
                <View style={styles.container} width={screenWidth}>
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