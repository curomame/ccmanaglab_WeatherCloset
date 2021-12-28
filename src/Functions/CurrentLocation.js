import React,{useState, useEffect} from 'react'
import * as Location from 'expo-location';

export default function CurrentLocation () {

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

    }

    

}
