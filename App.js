import * as Location from 'expo-location';

import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


const API_KEY = "32d86a6f1473247c8b4fd7aca2ab71a2"


export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState("");

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    
    console.log(latitude);

    const location = await Location.reverseGeocodeAsync({latitude, longitude})
        
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    
    console.log(typeof json);

    setDays(json.current.weather[0].main);
    setCity(location[0].city)

  }

useEffect(() => {
  getLocation();
},[])



  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.city}>{days}</Text>
      <View>
        <Text>오늘은 이렇게 입고나가요!</Text>
        <Text>🧤</Text>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"pink",
    paddingTop:100
  },
  city : {

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})



