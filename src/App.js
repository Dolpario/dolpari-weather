import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import GettingWeather from './screens/GettingWeather'
import WeatherContainer from './screens/WeatherContainer'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import moment from 'moment'
import HorizontalScrollViewScreen from './screens/HorizontalScrollViewScreen'
import { thisTypeAnnotation } from '@babel/types';
import Test from './Test'


const Api_Key = '9cb7f9c88f1217eb8cb4c450c3ee6cb2'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: 0.0,
      longitude: 0.0,
      WeatherData: null,
      fiveWeatherData: null,
      dayList: null,
      daydtList: null,
      maxMinTemp: null,
      city: null,
      todayTimeByTemp: null
    };
  }

  async componentDidMount() {
    await this.getLocation()
    this.getWeather(this.state.longitude, this.state.latitude)
    this.fiveDaysGetWeather(this.state.longitude, this.state.latitude)

  }

  getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude });
          resolve(true);
        },
        error => {
          this.setState({
            error: error
          });
          reject(error);
        }
      )
    })
  }

  getWeather = async (longitude, latitude) => {
    let { data } = await axios(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_Key}&units=metric&lang=kr`)
    // console.log(data)

    this.setState({ WeatherData: data, city: data.name });
  }


  fiveDaysGetWeather = async (longitude, latitude) => {
    let { data } = await axios(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Api_Key}&units=metric&lang=kr`)
    // console.log(data)
    this.setState({ fiveWeatherData: data });
    this.setDayTimeArray();
  }

  setDayTimeArray = () => {
    const { fiveWeatherData } = this.state
    let dayList = {}
    let daydtList = []
    let startDate
    let lastDate = null
    fiveWeatherData.list.map((ele, index) => {
      let convertdt = moment(ele.dt_txt).format('MM.DD')

      if (convertdt in dayList) {
        daydtList[convertdt].push(ele)
      }
      else {
        if (index == 0) {
          startDate = convertdt
        }
        if (index >= 33) {
          lastDate = convertdt
        }
        dayList[convertdt] = index
        daydtList[convertdt] = []
        daydtList[convertdt].push(ele)
      }
    })

    this.setState({ todayTimeByTemp: daydtList[startDate] })

    delete dayList[startDate]
    delete daydtList[startDate]
    if (lastDate != null) {
      delete dayList[lastDate]
      delete daydtList[lastDate]
    }
    console.log("dayList")
    console.log(dayList)
    this.setState({ dayList: dayList, daydtList: daydtList })
    this.setMaxMinTemp()
  }

  setMaxMinTemp = () => {
    const { dayList, daydtList } = this.state
    const keylist = Object.keys(daydtList)
    let tempList = []
    let maxMinTemp = {}
    let max, min
    keylist.map(ele => {
      daydtList[ele].map(element => {
        tempList.push(element.main.temp)
      })
      max = Math.max.apply(null, tempList)
      min = Math.min.apply(null, tempList)
      maxMinTemp[ele] = [min, max]
      tempList = []
    })
    
    // console.log(`maxMintemp: ${maxMinTemp}`)
    this.setState({ maxMinTemp: maxMinTemp })
  }



  render() {
    const { WeatherData, maxMinTemp } = this.state;
    return (
      <View style={styles.container}>
        {
          WeatherData && maxMinTemp
            ? <HorizontalScrollViewScreen
                style={styles.container}
                {...this.state} />
            : <GettingWeather />
        }
      </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})