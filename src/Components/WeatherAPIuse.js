import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';
import {REACT_APP_WEATHER_API_KEY} from "@env"

import HourlyWeather from './HourlyWeather';

import ChangeLocation from '../Functions/ChangeLocation';
import CurrentLocation from '../Functions/CurrentLocation'
import WearWhat from '../Functions/WearWhat';


import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeatherAPIuse() {

  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [doC, setDoC] = useState("");
  const [hourJson, setHourJson] = useState();

  const[modalVisible, setModalVisible] = useState(false);
  const[searchLocation, setSearchLocation] = useState("search Location!")

  const[saveLoData, setSaveLoData] = useState();

  useEffect(() => {
    getLocation();
  },[])


  //마지막으로 검색한 정보 저장하기
  
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }


  //weather api 사용하기 시작
  const weatherFind = async (LoData) => {

    console.log(LoData);

    const {latitude, longitude} = LoData;
    const location = await Location.reverseGeocodeAsync({latitude, longitude})

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`);


    const json = await response.json();
    setHourJson(json);


    setDays(json.current.weather[0].main);
    setCity(location[0].city)
    setDoC(json.current.temp.toFixed(1));

    setSaveLoData(LoData);
    console.log(saveLoData);
  }


  //현재 위치 받아오기

  const getLocation = async () => {
  
    const LoData = await CurrentLocation();
    weatherFind(LoData)
    }

    //검색 위치 받아오기
    
    //모달 띄우기
  const onPress = async () => {
    setModalVisible(!modalVisible);
  } 
    
    //모달 띄운 후 검색해서 현재 위치로 바꾸기
  const onChangeSubmit = async () => {
    
    const changeData = await ChangeLocation(searchLocation);
    weatherFind(changeData);
    setSearchLocation("search Location!");
    setModalVisible(!modalVisible)


    };





  return (
    <View style={styles.container} >

    <Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  setModalVisible(!modalVisible);
}}
>
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Text style={styles.modalText}>정확한 위치를 원하신다면,</Text>
    <Text style={styles.modalText}>시,도,구를 포함하여 검색해주세요 :)</Text>
    <Pressable
      style={[styles.button, styles.buttonClose]}
    >
      <TextInput
      keyboardType="default"
      onSubmitEditing={onChangeSubmit}
      onChangeText={text => setSearchLocation(text)}
      >
        {searchLocation}
      </TextInput>
    </Pressable>
  </View>
</View>
</Modal>

<View style={styles.locationchange}>


<TouchableOpacity onPress={getLocation}>
<Text style={styles.locationbutton}>Current Location</Text>
</TouchableOpacity>

<TouchableOpacity onPress={onPress}>
<Text style={styles.locationbutton}>Change Location</Text>
</TouchableOpacity>

</View>
    

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
  container: {
    flex:1,
    backgroundColor:"pink",
    alignItems:"center"
  },
  mainContainer : {
    alignItems:"center"
  },
  locationbutton : {
    margin:10
  },
  locationchange:{
    flexDirection:"row",
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
  },centeredView: {
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



