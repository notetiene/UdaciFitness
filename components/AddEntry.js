import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
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
import { white, purple } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

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
      style={Platform.OS === 'ios' ? styles.iosSubmitButton : styles.androidSubmitButton}
      onPress={onPress}
    >
      <Text
        style={styles.submitBtnText}
      >
        Submit
      </Text>
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
      <View
        style={styles.center}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
          size={100}
        />
        <Text>
          You already logged your information for today
        </Text>
        <TextButton
          style={{ padding: 10 }}
          onPress={reset}
        >
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
    <View
      style={styles.container}
    >
      <DateHeader
        date={(new Date()).toLocaleDateString()}
      />
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
          <View
            style={styles.row}
            key={key}
          >
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
