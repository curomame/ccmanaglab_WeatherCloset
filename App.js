import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY, REACT_APP_WEATHER_API_KEY} from "@env"
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, TextInput } from 'react-native';

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState("");
  const [doC, setDoC] = useState("");
  const [foreW, setForeW] = useState({});
  const [condition, setCondition] = useState(true);
  const [icon, setIcon] = useState("");



  //지역 변경 부분
  const [modalVisible, setModalVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState("Search Location");

  const onPress = async () => {

    setModalVisible(!modalVisible);
  }


  const onChangeSubmit = () => {

  
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`)
    .then(function (response) {
      console.log(response.data.results[0].geometry.location);  
    });

    setSearchLocation("Search Location")
    setModalVisible(!modalVisible)
  }


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
        
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`);
    const json = await response.json();
    
    setDays(json.current.weather[0].main);
    setCity(location[0].city)
    setDoC(json.current.temp.toFixed(1));

    //온도에 따른 옷 나오기

    let iconW = "";
    
    if (doC < 0) {
      iconW = "🧤";
      setIcon(iconW);
    } else if (doC > 0) {
      iconW = "👕"
      setIcon(iconW); 
    }

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
            <Text style={styles.modalText}>Hello World!</Text>
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

      <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.locationchange}>Change Location</Text>
      </TouchableOpacity>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.days}>{days}</Text>
      <Text style={styles.doC}>{doC}°C</Text>
      <Text style={styles.text}>오늘은 이렇게 입고나가요!</Text>
      <Text style={styles.wear}>{icon}</Text>
      </View>
      
    <View style={styles.forecast}>
      
      {condition ? 

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



