import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import {
  submitEntry,
  removeEntry,
} from '../utils/api';
import { addEntry } from '../actions';

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

SubmitButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

function AddEntry({ alreadyLogged, doAddEntry }) {
  const [state, setState] = useState(defaultState);

  const reset = () => {
    const key = timeToString();

    doAddEntry({
      [key]: getDailyReminderValue(),
    });

    // Route to home

    removeEntry(key);
  };

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons
          name="ios-happy"
          size={100}
        />
        <Text>
          You already logged your information for today
        </Text>
        <TextButton onPress={reset}>
          Reset
        </TextButton>
      </View>
    );
  }

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

    doAddEntry({
      [key]: entry,
    });

    setState(defaultState);

    // Navigate to Home

    submitEntry({ key, entry});

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

AddEntry.propTypes = {
  alreadyLogged: PropTypes.bool.isRequired,
  doAddEntry: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: (state[key] && typeof state[key].today === 'undefined') || false,
  };
}

export default connect(mapStateToProps, {
  doAddEntry: addEntry,
})(AddEntry);
