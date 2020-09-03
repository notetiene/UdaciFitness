import 'react-native-gesture-handler';
import React, { Fragment } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

const HistoryScreen = () => (
  <View style={styles.container}>
    <History />
  </View>
);

const EntryScreen = () => (
  <View style={styles.container}>
    <AddEntry />
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Fragment>
      <StatusBar />
      <Provider store={createStore(reducer)}>
        <NavigationContainer
          options={{
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
              height: 56,
              backgroundColor: Platform.OS === 'ios' ? white : purple,
              shadowColor: 'rgba(0, 0, 0, 0.24)',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 6,
              shadowOpacity: 1,
            },
          }}
        >
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="History"
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ tintColor }) => (
                  <Ionicons
                    name="ios-bookmarks"
                    size={30}
                    color={tintColor}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Add Entry"
              component={EntryScreen}
              options={{
                tabBarIcon: ({ tintColor }) => (
                  <FontAwesome
                    name="plus-square"
                    size={30}
                    color={tintColor}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </Fragment>
  );
}
