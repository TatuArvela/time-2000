import moment from 'moment';

const subtractTime = (time1, time2) => moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');

const calculateTotalTime = (getValue) => {
  let totalTime = subtractTime(getValue('stop'), getValue('start'));
  totalTime = subtractTime(totalTime, getValue('lunch'));
  totalTime = subtractTime(totalTime, getValue('breaks'));

  return totalTime;
};

const calculateUnloggedTime = (totalTime, getValue) => {
  let unloggedTime = subtractTime(totalTime, getValue('task1time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task2time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task3time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task4time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task5time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task6time'));

  return unloggedTime;
};

const calculateTimeDifference = (totalTime, getValue) => {
  let timeDifference;
  if (getValue('planned') >= totalTime) {
    timeDifference = subtractTime(getValue('planned'), totalTime);
  } else {
    timeDifference = `-${subtractTime(totalTime, getValue('planned'))}`;
  }

  return timeDifference;
};

const calculateTimes = (getValue, setValue) => {
  const totalTime = calculateTotalTime(getValue);
  const unloggedTime = calculateUnloggedTime(totalTime, getValue);
  const timeDifference = calculateTimeDifference(totalTime, getValue);

  setValue('total', totalTime);
  setValue('unlogged', unloggedTime);
  setValue('difference', timeDifference);
};

export default calculateTimes;
