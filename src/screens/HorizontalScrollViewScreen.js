import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native'
import WeatherContainer from './WeatherContainer'
import ClearSky from '../Image/ClearSky.svg'
import Cloud from '../Image/Cloud.svg'
import Fog from '../Image/Fog.svg'
import Rain from '../Image/Rain.svg'
import Snow from '../Image/Snow.svg'
import Thunderstrom from '../Image/Thunderstrom.svg'



export default class HorizontalScrollViewScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            svgConvertArray: []
        }
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;

    }


    componentDidMount() {
        this.weatherCodeConvert()
    }

    weatherCodeConvert = () => {
        const dayListKey = Object.keys(this.props.dayList)
        const {daydtList} = this.props
        let idCodeArray = []
        
        dayListKey.map(ele =>{
            idCodeArray.push(this.checkIdCode(daydtList[ele][4].weather[0].id))
        })
        idCodeArray.push( this.checkIdCode(this.props.WeatherData.weather[0].id))
        this.setState({
            svgConvertArray: idCodeArray
        })

    }

    checkIdCode =(id)=>{
        if(id>=200 && id<300){
            return 'Thunderstrom'
        }
        else if(id>=300 && id<600){
            return'Rain'
        }
        else if(id>=600 && id<700){
            return 'Snow'
        }
        else if(id>=801){
            return 'Cloud'
        }
        else if(id==800){
            return 'ClearSky'
        }
        else{
            return 'BadWeather'
        }
    }


    render() {
        const { WeatherData, city, todayTimeByTemp, dayList, maxMinTemp, daydtList } = this.props
        const todayMaxMintemp = [WeatherData.main.temp_min, WeatherData.main.temp_max]
        const dayListKey = Object.keys(dayList)
        const svgConvertArray = this.state.svgConvertArray
        const svgImageObject={
            Thunderstrom :  <Thunderstrom width={`100%`} height={`120%`}/>,
            Rain: <Rain width={`100%`} height={`120%`}/>,
            Snow: <Snow width={`100%`} height={`120%`}/>,
            Cloud: <Cloud  width={`100%`} height={`120%`}/>,
            ClearSky: <ClearSky width={`100%`} height={`120%`}/>,
            BadWeather: <Fog width={`100%`} height={`120%`}/>
        }
        return (
            <ScrollView horizontal={true} pagingEnabled={true}>
                <View style={styles.mainView}>
                    <View style={styles.container} width={this.screenWidth}>
                        <View style={styles.svgContainer}>
                           {svgImageObject[svgConvertArray[4]]}
                        </View>
                        <View style={styles.absoluteContainer}>
                            <WeatherContainer
                                nowTemp={WeatherData.main.temp}
                                weatherCondition={WeatherData.weather[0].description}
                                city={city}
                                humidity={WeatherData.main.humidity}
                                wind={WeatherData.wind.speed}
                                maxMinTemp={todayMaxMintemp}
                                timeByTemp={todayTimeByTemp}
                                timeCheack={false} 
                                isBlack={svgConvertArray[4]==='BadWeather'?true:false}
                                />
                            {/* <WeatherContainer nowTemp={} weatherCondition={} city={} humidity={} wind={}  maxMinTemp={} timeByTemp={} /> */}
                        </View>
                    </View>
                    {dayListKey.map((ele, index) => {
                        return (<View style={styles.container} width={this.screenWidth} key={index}>
                            <View style={styles.svgContainer}>
                                {svgImageObject[svgConvertArray[index]]}
                            </View>
                            <View style={styles.absoluteContainer}>
                                {console.log("isBlack")}
                                {console.log(isBlack)}
                                <WeatherContainer
                                    nowTemp={null}
                                    weatherCondition={null}
                                    city={city}
                                    humidity={null}
                                    wind={null}
                                    maxMinTemp={maxMinTemp[ele]}
                                    timeByTemp={daydtList[ele]}
                                    timeCheck={true} 
                                    isBlack={svgConvertArray[index]==='BadWeather'?true:false}
                                    />
                            </View>
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
        overflow: 'hidden'
    },
    absoluteContainer: {
        zIndex: 1
    },
    svgContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
    }

})
