import React from 'react';
import { Text } from 'react-native';
import { datePropType } from '../utils/common';

export default function DateHeader({ date }) {
  return (
    <Text>
      {date}
    </Text>
  );
}

DateHeader.propTypes = {
  date: datePropType.isRequired,
};
