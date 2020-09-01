import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import { timeToString } from '../utils/helpers';
import { purple, white } from '../utils/colors';

export default function UdaciFitnessCalendar({
  items,
  renderItem,
  renderEmptyDate,
}) {
  const [selectedDate, setSelectedDate] = useState(timeToString());
  const dates = Object.entries(items);

  const markedDates = Object.fromEntries(dates.map(([key, value]) => [key, {
    marked: value !== null,
    selected: key === selectedDate,
  }]));
  const handleDateChange = ({ dateString }) => {
    setSelectedDate(dateString);
  };

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        maxDate={timeToString()}
        onDayPress={handleDateChange}
        theme={{
          arrowColor: purple,
          selectedDayBackgroundColor: purple,
          dotColor: purple,
          selectedDotColor: white,
        }}
        enableSwipeMonths
      />
      {(items[selectedDate] && renderItem(items[selectedDate]))
       || renderEmptyDate(items[selectedDate])}
    </View>
  );
}

UdaciFitnessCalendar.propTypes = {
  items: PropTypes.objectOf(PropTypes.oneOfType([
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
  renderItem: PropTypes.func.isRequired,
  renderEmptyDate: PropTypes.func.isRequired,
};
