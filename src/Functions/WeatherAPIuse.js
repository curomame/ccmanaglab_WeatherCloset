import React, {useState} from "react";
import {REACT_APP_WEATHER_API_KEY} from "@env"

const WeatherAPIuse = async ({ latitude, longitude },setDays,setDoC) => {

  try {
  const responseNew = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`) ;
  const json = await responseNew.json();
  console.log(json,0);

  setDays(json.current.weather[0].main);
  console.log(Days,1);
  
  setDoC(json.current.temp.toFixed(1));
  console.log(DoC,2);
  // hourlyDoC(json);

  } catch(err){
    throw 'Error In WeatherAPIuse'
  }
  
}

export default WeatherAPIuse;