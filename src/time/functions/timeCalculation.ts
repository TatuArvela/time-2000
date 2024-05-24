import { Time } from '@tatuarvela/wisp';
import moment from 'moment';

import { Values } from '../types.ts';
import { buildValueGetter } from './valueState.ts';

export const formatTime = (time: Time): string =>
  `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;

const timeToMoment = (time: Time) => moment(formatTime(time), 'HH:mm');

function subtractTime(time1: Time, time2: Time): Time {
  const formattedTime = moment
    .utc(timeToMoment(time1).diff(timeToMoment(time2)))
    .format('HH:mm');
  const [hours, minutes] = formattedTime.split(':');
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  };
}

export function calculateTimes(values: Values) {
  const getValue = buildValueGetter(values) as (key: string) => Time;

  let totalTime = subtractTime(getValue('stop'), getValue('start'));
  totalTime = subtractTime(totalTime, getValue('lunch'));
  totalTime = subtractTime(totalTime, getValue('breaks'));

  let unloggedTime = totalTime;
  values.tasks.forEach((value) => {
    unloggedTime = subtractTime(unloggedTime, value.time);
  });

  let timeDifference;
  if (getValue('planned') >= totalTime) {
    timeDifference =
      '+' + formatTime(subtractTime(totalTime, getValue('planned')));
  } else {
    timeDifference =
      '-' + formatTime(subtractTime(totalTime, getValue('planned')));
  }

  return {
    totalTime: formatTime(totalTime),
    unloggedTime: formatTime(unloggedTime),
    timeDifference: timeDifference,
  };
}
