/*
  Sakura Time 2000
*/

var defaults = {
  start:    "08:30",
  lunch:    "00:30",
  stop:     "16:30",
  breaks:   "00:00",
  task1:    "00:00",
  task2:    "00:00",
  task3:    "00:00",
  task4:    "00:00",
  task5:    "00:00",
  task6:    "00:00",
  planned:  "07:30"
}

function setDefaults() {
  for (var key in defaults) {
    document.getElementById(key).value = defaults[key];
  }
}

function getValue(id) {
  var value = document.getElementById(id).value;
  return (value != '' ? value : '00:00');
}

function subtractTime(time1, time2) {
  return moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');
}

function calculateTimes() {
  var totalTime = subtractTime(getValue('stop'), getValue('start'));
  totalTime = subtractTime(totalTime, getValue('lunch'));
  totalTime = subtractTime(totalTime, getValue('breaks'));

  var unloggedTime = subtractTime(totalTime, getValue('task1'));
  unloggedTime = subtractTime(unloggedTime, getValue('task2'));
  unloggedTime = subtractTime(unloggedTime, getValue('task3'));
  unloggedTime = subtractTime(unloggedTime, getValue('task4'));
  unloggedTime = subtractTime(unloggedTime, getValue('task5'));
  unloggedTime = subtractTime(unloggedTime, getValue('task6'));

  var timeDifference;
  if (getValue('planned') > totalTime) {
    document.getElementById('differenceTitle').innerHTML = 'Missing time';
    var timeDifference = subtractTime(getValue('planned'), totalTime);
  }
 else {
    document.getElementById('differenceTitle').innerHTML = 'Overtime';
    var timeDifference = subtractTime(totalTime, getValue('planned'));
  }

  document.getElementById('total').value = totalTime;
  document.getElementById('unlogged').value = unloggedTime;
  document.getElementById('difference').value = timeDifference;
}

setDefaults();
calculateTimes();

var inputs = document.querySelectorAll('input[data-type="time"]');
for (var input in inputs) {
  if (inputs[input].addEventListener != null) {
    inputs[input].addEventListener('keyup', function(e) {
      calculateTimes(e);
    });
  }
}
var buttons = document.querySelectorAll('time-button');
for (var button in buttons) {
  if (buttons[button].addEventListener != null) {
    buttons[button].addEventListener('click', function(e) {
      calculateTimes(e);
    });
  }
}

// Exit prompt
// window.onbeforeunload = function() {
//   return true;
// };