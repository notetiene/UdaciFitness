import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  },
});

export default function TextButton({ children, onPress, style = {}}) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text
        style={[styles.reset, style]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.string),
    PropTypes.objectOf(PropTypes.number),
  ]),
};

TextButton.defaultProps = {
  style: {},
};
