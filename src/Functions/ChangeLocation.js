import axios from 'axios'
import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY} from "@env"

import React from 'react'

async function ChangeLocation(searchLocation) {

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`)
    .then(function (response) {

      return (response);
    }
    
    )
    
  }
export default ChangeLocation;