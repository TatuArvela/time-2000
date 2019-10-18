import moment from "moment";

const subtractTime = (time1, time2) => {
  return moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');
}

const calculateTimes = (getValue, setValue) => {
  var totalTime = subtractTime(getValue('stop'), getValue('start'));
  totalTime = subtractTime(totalTime, getValue('lunch'));
  totalTime = subtractTime(totalTime, getValue('breaks'));

  var unloggedTime = subtractTime(totalTime, getValue('task1time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task2time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task3time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task4time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task5time'));
  unloggedTime = subtractTime(unloggedTime, getValue('task6time'));

  var timeDifference;
  if (getValue('planned') >= totalTime) {
    var timeDifference = subtractTime(getValue('planned'), totalTime);
  }
 else {
    var timeDifference = '-' + subtractTime(totalTime, getValue('planned'));
  }

  setValue('total', totalTime);
  setValue('unlogged', unloggedTime);
  setValue('difference', timeDifference);
}

export {
  calculateTimes
}