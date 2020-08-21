import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  getMetricMetaInfo,
  timeToString,
} from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';

const defaultState = {
  run: 0,
  bike: 0,
  swim: 0,
  sleep: 0,
  eat: 0,
};

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

export default function AddEntry() {
  const [state, setState] = useState(defaultState);

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    const count = state[metric] + step;

    setState({
      ...state,
      [metric]: count > max ? max : count,
    });
  };

  const decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    const count = state[metric] - step;

    setState({
      ...state,
      [metric]: count < 0 ? 0 : count,
    });
  };

  const slide = (metric, value) => {
    setState({
      ...state,
      [metric]: value,
    });
  };

  const submit = () => {
    const key = timeToString();
    const entry = state;

    // Update Redux

    setState(defaultState);

    // Navigate to Home

    // Save to DB

    // Clear the local notification
  };

  const metaInfo = getMetricMetaInfo();

  return (
    <View>
      {Object.keys(metaInfo).map((key) => {
        const {
          getIcon,
          type,
          displayName,
          max,
          unit,
          step,
        } = metaInfo[key];
        const value = state[key];

        return (
          <View key={key}>
            <DateHeader
              date={(new Date()).toLocaleDateString()}
            />
            {getIcon()}
            {type === 'slider'
              ? (
                <UdaciSlider
                  value={value}
                  onChange={(val) => slide(key, val)}
                  displayName={displayName}
                  max={max}
                  unit={unit}
                  step={step}
                />
              )
              : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => increment(key)}
                  onDecrement={() => decrement(key)}
                  displayName={displayName}
                  max={max}
                  unit={unit}
                  step={step}
                />
              )}
          </View>
        );
      })}

      <SubmitButton
        onPress={submit}
      />
    </View>
  );
}
