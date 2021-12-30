import React,{useState, useEffect} from 'react'
import * as Location from 'expo-location';



    const CurrentLocation = async () => {
    
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    
    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    
    return ({latitude, longitude});
    
    // 값을 리턴하면 컴포넌트가 아니라 값 자체로 함수에 넣어서 사용할 수 있다는 것이다
    // 그런데 원래 이렇게 사용해되 되는지는 모르겠음.

    }
    



export default CurrentLocation;
