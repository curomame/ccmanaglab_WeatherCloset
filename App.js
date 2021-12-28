import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY, REACT_APP_WEATHER_API_KEY} from "@env"
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, TextInput } from 'react-native';

import ChangeLocation from './src/Components/ChangeLocation';

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState("");
  const [doC, setDoC] = useState("");
  const [foreW, setForeW] = useState({});
  const [icon, setIcon] = useState("");
  // const [latitudec, setLatitudec] = useState("");
  // const [longitudec, setLongitudec] = useState("")

  useEffect(() => {
    getLocation();
  },[])

  useEffect(() => {
    wearWhat()
  },[doC])


//옷 변경
//온도에 따른 옷 나오기

const wearWhat = () => {
  let iconW = "";
      
  if (doC < 0) {
    iconW = "❄️";
    setIcon(iconW);
  } else if (doC > 0) {
    iconW = "🌞"
    setIcon(iconW); 
  }

}





  //모달 등장

  // const onPress = async () => {
  //   setModalVisible(!modalVisible);
  // }

  // // 바꾸기 누르고 엔터
  // const onChangeSubmit = async () => {

  //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`)
  //   .then(function (response) {
  //     ChangeGetLocation(response)
      
  //   });

  //   setSearchLocation("search Location!");
  //   ChangeGetLocation();
  //   setModalVisible(!modalVisible);
  // }

  //바꾼 위치로 변경하기 메인 함수 //객체 자체로 들어가야해서 계속 안됐던거였음.

  // const ChangeGetLocation = async (response) => {

  //   const { latitude, longitude } = { latitude : response.data.results[0].geometry.location.lat, longitude : response.data.results[0].geometry.location.lng }
  //   const location = await Location.reverseGeocodeAsync({latitude, longitude})
  //   setCity(location[0].city);
    
  //   //웨더 에이디피아이
  //   WeatherAPIuse({ latitude, longitude });

  //   //옷 변경
  //   wearWhat();

  // }


//웨더 에이피아이 사용 분리

  const WeatherAPIuse = async ({ latitude, longitude }) => {

    try {
    const responseNew = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`) ;
    const json = await responseNew.json();

    setDays(json.current.weather[0].main);
    setDoC(json.current.temp.toFixed(1));
    hourlyDoC(json);

    } catch(err){
      throw err
    }
    
  }


//시간별 온도 변경

const hourlyDoC = async (json) => {

  const hourlyDo = {}

  forhourlyDo = () => {
      for(let i = 0; i<6; i ++){
      hourlyDo['hour_'+(i+1)] = { main : json.hourly[i].weather[0].main, temp : json.hourly[i].temp}
      }
    setForeW(hourlyDo)
  }
  
  await forhourlyDo()

}





  //현재 위치를 받아오기
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    
    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});

    const location = await Location.reverseGeocodeAsync({latitude, longitude})

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`);
    const json = await response.json();
    

    setDays(json.current.weather[0].main);
    setCity(location[0].city)
    setDoC(json.current.temp.toFixed(1));

    //온도에 따른 옷 나오기

    wearWhat();

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


    <ChangeLocation/>

      <View style={styles.mainContainer}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.days}>{days}</Text>
      <Text style={styles.doC}>{doC}°C</Text>
      <Text style={styles.text}>오늘은 이렇게 입고나가요!</Text>
      <Text style={styles.wear}>{icon}</Text>
      </View>
      
    <View style={styles.forecast}>
      


      <View style={styles.foreContainer}>

      <View style={styles.foreContainerText}>
      <Text>1시간 후</Text>
      <Text>{foreW?.hour_1?.main}</Text>
      <Text>{foreW?.hour_1?.temp.toFixed(1)}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>2시간 후</Text>
      <Text>{foreW?.hour_2?.main}</Text>
      <Text>{foreW?.hour_2?.temp.toFixed(1)}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>3시간 후</Text>
      <Text>{foreW?.hour_3?.main}</Text>
      <Text>{foreW?.hour_3?.temp.toFixed(1)}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>4시간 후</Text>
      <Text>{foreW?.hour_4?.main}</Text>
      <Text>{foreW?.hour_4?.temp.toFixed(1)}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>5시간 후</Text>
      <Text>{foreW?.hour_5?.main}</Text>
      <Text>{foreW?.hour_5?.temp.toFixed(1)}</Text>
      </View>

      <View style={styles.foreContainerText}>
      <Text>6시간 후</Text>
      <Text>{foreW?.hour_6?.main}</Text>
      <Text>{foreW?.hour_6?.temp.toFixed(1)}</Text>
      </View>

      </View>


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
  mainContainer : {
    alignItems:"center"
  },
  locationchange:{
    marginTop:100,
    marginBottom : 20,
    fontSize: 14
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
    alignItems:"center",
    padding:5
  },button : {
    backgroundColor : "white"
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "pink",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})



