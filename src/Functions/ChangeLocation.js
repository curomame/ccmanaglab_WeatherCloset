import {REACT_APP_GOOGLE_API_KEY} from "@env"
import axios from 'axios';
import React,{useState} from 'react'
import * as Location from 'expo-location';
import { Modal, View, Pressable, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';


export default function ChangeLocation() {

  const[modalVisible, setModalVisible] = useState(false);
  const[searchLocation, setSearchLocation] = useState("search Location!")

 //모달 등장

const onPress = async () => {
  setModalVisible(!modalVisible);
}

// 바꾸기 누르고 엔터
const onChangeSubmit = async () => {

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`)
  .then(function (response) {
    ChangeGetLocation(response)
    
  });

  setSearchLocation("search Location!");
  setModalVisible(!modalVisible);
}

//바꾼 위치로 변경하기 메인 함수 //객체 자체로 들어가야해서 계속 안됐던거였음.

// const ChangeGetLocation = async (response) => {
//   const { latitude, longitude } = { latitude : response.data.results[0].geometry.location.lat, longitude : response.data.results[0].geometry.location.lng }
//   const location = await Location.reverseGeocodeAsync({latitude, longitude})
//   setCity(location[0].city);


// }

  return (
    <>
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

<View style={styles.mainContainer}>
<TouchableOpacity onPress={onPress}>
<Text style={styles.locationchange}>Change Location</Text>
</TouchableOpacity>
</View>
</>
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




