import React, { Component } from 'react';
import { StyleSheet,Text ,View } from 'react-native'
import GettingWeather from './screens/GettingWeather'
import WeatherContainer from './screens/WeatherContainer'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import moment from 'moment'
import HorizontalScrollViewScreen from './screens/HorizontalScrollViewScreen'
import { thisTypeAnnotation } from '@babel/types';
import Test from './Test'


const Api_Key= '9cb7f9c88f1217eb8cb4c450c3ee6cb2'

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      latitude: 0.0,
      longitude:0.0,
      WeatherData: {},
      fiveWeatherData:{},
      dayList : null,
      daydtList: null,
      maxMinTemp: null,
      city: null,
      todayTimeByTemp:null
    };
  }

  componentDidMount() {
    this.GetLocation();
  }

  GetLocation = ()=> {
     Geolocation.getCurrentPosition(
      position => {
        this.setState({ longitude:position.coords.longitude,latitude:position.coords.latitude });
        // console.log(position)
        this.getWeather(this.state.longitude,this.state.latitude);
        this.fiveDaysGetWeather(this.state.longitude,this.state.latitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    )
  }

  getWeather = async (longitude,latitude)=>{
    let {data}= await axios(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_Key}&units=metric&lang=kr`)
    // console.log(data)
    this.setState({ WeatherData: data, city:data.name });
  }

  
  fiveDaysGetWeather = async (longitude,latitude)=>{
    let {data}= await axios(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Api_Key}&units=metric`)
    // console.log(data)
    this.setState({ fiveWeatherData: data });
    this.setDayTimeArray();
  }

  setDayTimeArray = ()=>{
    const {fiveWeatherData} = this.state
    let dayList = {}
    let daydtList=[]
    let startDate
    let lastDate = null
    fiveWeatherData.list.map((ele,index)=>{
      let convertdt=moment(ele.dt_txt).format('MM.DD')
     
      if(convertdt in dayList) 
      {
        daydtList[convertdt].push(ele)
      }
      else
      {
        if (index == 0)
        {
          startDate = convertdt
        }
        if (index >= 33)
        {
          lastDate = convertdt
        }
        dayList[convertdt] = index
        daydtList[convertdt] = []
        daydtList[convertdt].push(ele)
      }
    })

    this.setState({todayTimeByTemp:daydtList[startDate]})
   
    delete dayList[startDate]
    delete daydtList[startDate]
    if(lastDate!=null)
    {
      delete dayList[lastDate]
      delete daydtList[lastDate]
    }

    this.setState({dayList:dayList,daydtList:daydtList})
    console.log(dayList)
    console.log(daydtList)
    // console.log(Object.keys(dayList).length)
    this.setMaxMinTemp()
  }

  setMaxMinTemp= ()=> {
    const {dayList,daydtList} = this.state
    const keylist = Object.keys(daydtList)
    let tempList = [] 
    let maxMinTemp = {}
    let max,min
    keylist.map(ele => {
      daydtList[ele].map(element=> {
        tempList.push(element.main.temp)
      })
      max = Math.max.apply(null, tempList)
      min = Math.min.apply(null, tempList)
      maxMinTemp[ele] = [min,max]
      tempList = []
    })
    console.log(maxMinTemp)
    this.setState({ maxMinTemp:maxMinTemp,isLoaded: true })
  }



  render() {
    const { isLoaded,longitude,latitude } = this.state;
    
    return (
      <View style={styles.container}>
        {isLoaded ? <HorizontalScrollViewScreen style={styles.container} WeatherData={this.state.WeatherData} dayList={this.state.dayList} daydtList={this.state.daydtList} city={this.state.city} maxMinTemp={this.state.maxMinTemp}  todayTimeByTemp={this.state.todayTimeByTemp}/> : <GettingWeather />}
         {/* <Test />  */}
      </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})