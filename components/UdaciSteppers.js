import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  FontAwesome,
  Entypo,
} from '@expo/vector-icons';
import { UdaciSteppersPropType } from '../utils/common';

export default function UdaciSteppers({
  unit,
  value,
  onIncrement,
  onDecrement,
}) {
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={onDecrement}
        >
          <FontAwesome
            name="minus"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onIncrement}
        >
          <FontAwesome
            name="plus"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}

UdaciSteppers.propTypes = UdaciSteppersPropType;
