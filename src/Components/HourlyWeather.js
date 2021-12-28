import React,{useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function HourlyWeather(json) {

  const [foreW, setForeW] = useState({});  

    console.log(json.data[0]);
      // 시간별 날씨 객체 input

      // const forWobj = {}

      // forWobjFunc = () => {
      
      //     for(let i = 0; i<6; i ++){
      //     forWobj['hour_'+(i+1)] = { main : json.hourly[i].weather[0].main, temp : json.hourly[i].temp}        
      //   }
  
      //   setForeW(forWobj)
      // }
    
      // forWobjFunc()

  return (
    <>
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
  },})