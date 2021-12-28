import React, { useState } from 'react';
import { Text } from 'react-native';

const WearWhat = (doC) => {

  let icon = ""

  if (doC.wear < 0) {
    icon = "❄️";
    } else if (doC.wear > 0) {
    icon = "🌞"
  }

  return (
    <Text>{icon}</Text>
  )

}

export default WearWhat;