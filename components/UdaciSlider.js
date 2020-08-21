import React from 'react';
import { View, Slider, Text } from 'react-native';
import { UdaciSliderPropType } from '../utils/common';

export default function UdaciSlider({
  max,
  unit,
  step,
  value,
  onChange,
}) {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}

UdaciSlider.propTypes = UdaciSliderPropType;
