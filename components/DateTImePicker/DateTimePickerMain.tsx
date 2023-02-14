import React from 'react';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';

const DateTimePickerMain: React.FC<{
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedTime, setSelectedTime }) => {
  const handleTime = (times: DateTimePickerEvent) => {
    const totalTime = moment(times.nativeEvent.timestamp).format();
    const timeWithGMT = moment(totalTime).format('HH:mm:ss');
    setSelectedTime(timeWithGMT);
  };

  return (
    <DateTimePicker
      mode="time"
      value={new Date()}
      onChange={time => handleTime(time)}
    />
  );
};

export default DateTimePickerMain;
