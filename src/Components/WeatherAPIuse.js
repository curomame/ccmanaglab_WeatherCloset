import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import * as Location from 'expo-location';
import {REACT_APP_WEATHER_API_KEY} from "@env"

import HourlyWeather from './HourlyWeather';

import CurrentLocation from '../Functions/CurrentLocation'
import ChangeLocation from '../Functions/ChangeLocation';
import WearWhat from '../Functions/WearWhat';


export default function WeatherAPIuse() {

  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [doC, setDoC] = useState("");
  const [hourJson, setHourJson] = useState();

  useEffect(() => {
    getLocation();
  },[])


  const getLocation = async () => {
  
    //현재 위치 받아오기
    //내 생각에는 return 값을 받아와야 한다고 생각하는디?

    console.log(await CurrentLocation(),3);

    // const locationData = await CurrentLocation.latitude;
    // console.log(locationData);
    

    // const { status } = await Location.requestForegroundPermissionsAsync();

    // if (status !== 'granted') {
    //   setErrorMsg('Permission to access location was denied');
    //   return;
    // }
  
    
    // const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});

    //위치 변경 시도하기


    const location = await Location.reverseGeocodeAsync({latitude, longitude})

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`);


    const json = await response.json();
    setHourJson(json);


    setDays(json.current.weather[0].main);
    setCity(location[0].city)
    setDoC(json.current.temp.toFixed(1));

    }

  return (
    <View style={styles.container} >


    <ChangeLocation/>

      <View style={styles.mainContainer}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.days}>{days}</Text>
        <Text style={styles.doC}>{doC}°C</Text>
        <Text style={styles.text}>오늘은 이렇게 입고나가요!</Text>
        <WearWhat wear={doC} style={styles.wear}/> 
      </View>
      
    <HourlyWeather data={hourJson} />
 
    </View>
  )
}

const styles= StyleSheet.create({

  mainContainer : {
    alignItems:"center"
  },

  city : {
    fontSize:30,
    fontWeight:"800"
  },
  days : {
    marginTop:15,
    fontSize:25,
  },
  doC : {
    marginTop:15,
    fontSize : 25,
  },
  text: {
    fontSize : 14,
    marginTop: 40
  },
  wear : {
    marginTop: 15,
    fontSize : 20,
  },

  forecast : {
    fontSize : 12,
  },
  foreContainer : {
    flex:1,
    flexDirection:"row",
    paddingTop:20,
    justifyContent:"space-evenly"
  },
  foreContainerText : {
    alignItems:"center",
    padding:5
  },button : {
    backgroundColor : "white"
  },
})



