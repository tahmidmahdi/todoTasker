import React from 'react';

import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarMain: React.FC<{
  todayDate?: string;
}> = ({ todayDate }) => (
  <Calendar
    style={styles.calendar}
    initialDate={todayDate}
    minDate={todayDate}
    onDayPress={day => {
      console.log('selected day', day);
    }}
    firstDay={1}
    showWeekNumbers
    onPressArrowLeft={subtractMonth => subtractMonth()}
    onPressArrowRight={addMonth => addMonth()}
    disableAllTouchEventsForDisabledDays
    enableSwipeMonths
  />
);

export default CalendarMain;

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
  },
});
