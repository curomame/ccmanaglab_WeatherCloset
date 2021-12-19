import * as Location from 'expo-location';
import React,{useState, useEffect} from 'react';

import { Text, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';


const API_KEY = "32d86a6f1473247c8b4fd7aca2ab71a2"

const image = {
  uri : "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
};

export default function App() {


  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState("");
  const [doC, setDoC] = useState("");
  const [foreW, setForeW] = useState({});
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    setCondition(!condition)
  },[foreW])
  
  useEffect(() => {
    getLocation();
  },[])

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    

    const location = await Location.reverseGeocodeAsync({latitude, longitude})
        
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    
    setDays(json.current.weather[0].main);
    setCity(location[0].city)
    setDoC(json.current.temp.toFixed(1));

    // 시간별 날씨 객체 input

    const forWobj = {}

    forWobjFunc = () => {
    
        for(let i = 0; i<6; i ++){
        forWobj['hour_'+(i+1)] = { main : json.hourly[i].weather[0].main, temp : json.hourly[i].temp}        
      }

      setForeW(forWobj)
    }
  
    forWobjFunc()

    }
    




  return (

    <View style={styles.container} >

      <View>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.days}>{days}</Text>
      <Text style={styles.doC}>{doC}°C</Text>
      <Text style={styles.text}>오늘은 이렇게 입고나가요!</Text>
      <Text style={styles.wear}>🧤</Text>
      </View>
      
    <View style={styles.forecast}>
      
      {condition ? 
      

      <View style={styles.foreContainer}>

      <View style={styles.foreContainerText}>
      <Text>{foreW?.hour_1?.main}</Text>
      <Text>{foreW?.hour_1?.temp}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>{foreW?.hour_2?.main}</Text>
      <Text>{foreW?.hour_2?.temp}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>{foreW?.hour_3?.main}</Text>
      <Text>{foreW?.hour_3?.temp}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>{foreW?.hour_4?.main}</Text>
      <Text>{foreW?.hour_4?.temp}</Text>
      </View>

      <View style={styles.foreContainer.foreContainerText}>
      <Text>{foreW?.hour_5?.main}</Text>
      <Text>{foreW?.hour_5?.temp}</Text>
      </View>

      <View style={styles.foreContainer.foreContainerText}>
      <Text>{foreW?.hour_6?.main}</Text>
      <Text>{foreW?.hour_6?.temp}</Text>
      </View>

      </View>

      : <Text>Loading</Text>}

    </View>

    </View>

  );

      }

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"pink",
    alignItems:"center"
  },
  city : {
    marginTop:100,
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
  image : {
    width: "100%", 
    height: "100%"
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
    alignItems:"center"
  },

})



