import moment from 'moment';
import 'moment-duration-format';

export const getDuration = time => moment.duration(time, 'milliseconds');
export const getTimerDuration = time => (
  getDuration(time).format('hh:mm:ss', { trim: false })
);
export const getHoursDuration = time => getDuration(time).format('h [h]', 2);
