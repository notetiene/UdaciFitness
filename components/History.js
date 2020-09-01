import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from './UdaciFitnessCalendar';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const renderItem = ({ today, ...metrics }, formattedDate, key) => (
  <View
    style={styles.item}
  >
    {today
      ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text
            style={styles.noDataText}
          >
            {today}
          </Text>
        </View>
      )
      : (
        <TouchableOpacity
          onPress={() => console.log('Pressed!')}
        >
          <MetricCard
            metrics={metrics}
            date={formattedDate}
          />
        </TouchableOpacity>
      )}
  </View>
);

const renderEmptyDate = (formattedDate) => (
  <View
    style={styles.item}
  >
    <DateHeader
      date={formattedDate}
    />
    <Text
      style={styles.noDataText}
    >
      You didn’t log any data on this day
    </Text>
  </View>
);

function History({ actualEntries, doReceiveEntries, doAddEntry }) {
  useEffect(() => {
    fetchCalendarResults()
      .then(doReceiveEntries)
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          doAddEntry({
            [timeToString()]: getDailyReminderValue(),
          });
        }
      });
  }, [doAddEntry, doReceiveEntries]);

  return (
    <UdaciFitnessCalendar
      items={actualEntries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
}

History.propTypes = {
  actualEntries: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.exact({
      bike: PropTypes.number,
      eat: PropTypes.number,
      run: PropTypes.number,
      sleep: PropTypes.number,
      swim: PropTypes.number,
    }),
    PropTypes.exact({
      today: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ])).isRequired,
  doReceiveEntries: PropTypes.func.isRequired,
  doAddEntry: PropTypes.func.isRequired,
};

function mapStateToProps(entries) {
  return {
    actualEntries: entries,
  };
}
export default connect(mapStateToProps, {
  doReceiveEntries: receiveEntries,
  doAddEntry: addEntry,
})(History);
