import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import AddEntry from './components/AddEntry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <AddEntry />
    </View>
  );
}
