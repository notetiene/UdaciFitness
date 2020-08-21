import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};
