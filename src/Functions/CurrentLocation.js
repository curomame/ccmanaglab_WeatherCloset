import React,{useState, useEffect} from 'react'
import * as Location from 'expo-location';

async function CurrentLocation () {

    const getLocation = async () => {
    
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    
    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    
    console.log(1);
    return (3);

    }
    

    console.log(await getLocation(),4)

    console.log(2);

}

export default CurrentLocation;
