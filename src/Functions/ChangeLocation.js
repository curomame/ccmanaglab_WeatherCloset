import axios from 'axios'
import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY} from "@env"

import React from 'react'

const ChangeLocation = async (searchLocation) => {

    let axiosLocation = '4';

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${REACT_APP_GOOGLE_API_KEY}`)
    .then(function (response) 
    {
      return response;
    })

    console.log(this.response);

  }
export default ChangeLocation;