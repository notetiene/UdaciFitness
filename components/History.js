import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from './UdaciFitnessCalendar';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

const renderItem = ({ today, ...metrics }, formattedDate, key) => (
  <View
    key={key}
  >
    {today
      ? <Text>{JSON.stringify(today)}</Text>
      : <Text>{JSON.stringify(metrics)}</Text>}
  </View>
);
const renderEmptyDate = () => (
  <View>
    <Text>No Data for this day</Text>
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
