import axios from 'axios'
import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY} from "@env"

import React from 'react'

const ChangeLocation = async (searchLocation) => {
  

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`);

  const json = await response.json();
  const changeData = { latitude : json.results[0].geometry.location.lat, longitude : json.results[0].geometry.location.lng }

  console.log(changeData);

  return changeData;
}

export default ChangeLocation;