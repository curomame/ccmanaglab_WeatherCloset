import React from 'react';
import {View, StyleSheet} from 'react-native';

import WeatherAPIuse from './src/Components/WeatherAPIuse';

export default function App() {


  return (

    <View style={styles.container} >

    <WeatherAPIuse/>

    </View>

  );

      }

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"pink",
    alignItems:"center"
  }
})



