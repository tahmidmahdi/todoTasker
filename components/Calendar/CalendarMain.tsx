import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarMain: React.FC<{
  todayDate?: string;
  setCalendarDate: React.Dispatch<React.SetStateAction<string>>;
}> = ({ todayDate, setCalendarDate }) => {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if (date !== '') {
      setCalendarDate(moment(date, 'YYYY-MM-DD').format('MMMM Do YYYY'));
    }
  }, [date]);

  return (
    <Calendar
      style={styles.calendar}
      initialDate={todayDate}
      minDate={todayDate}
      onDayPress={day => {
        setDate(day.dateString);
      }}
      disableAllTouchEventsForDisabledDays
      enableSwipeMonths
    />
  );
};

export default CalendarMain;

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
  },
});
