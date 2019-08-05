const moment = require("moment");

/* Sakura Time 2000
   ========================================================================== */

const fields = [
  'start',
  'stop',
  'lunch',
  'breaks',
  'task1time',
  'task1desc',
  'task2time',
  'task2desc',
  'task3time',
  'task3desc',
  'task4time',
  'task4desc',
  'task5time',
  'task5desc',
  'task6time',
  'task6desc',
  'total',
  'unlogged',
  'planned',
  'difference'
];

const empty = {
  start: '00:00',
  lunch: '00:00',
  stop: '00:00',
  breaks: '00:00',
  task1time: '00:00',
  task2time: '00:00',
  task3time: '00:00',
  task4time: '00:00',
  task5time: '00:00',
  task6time: '00:00',
  planned: '00:00'
}

const defaults = {
  start: '08:30',
  lunch: '00:30',
  stop: '16:30',
  breaks: '00:00',
  task1time: '00:00',
  task2time: '00:00',
  task3time: '00:00',
  task4time: '00:00',
  task5time: '00:00',
  task6time: '00:00',
  planned: '07:30'
}

/* Time calculations
   ========================================================================== */

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

  document.getElementById('total').value = totalTime;
  document.getElementById('unlogged').value = unloggedTime;
  document.getElementById('difference').value = timeDifference;
}

/* Functions
   ========================================================================== */

// Exit prompt
//window.onbeforeunload = function() {
//  return true;
//};

function setValues(values) {
  for (var field in fields) {
    let value = (values[fields[field]] != null) ? values[fields[field]] : '';
    document.getElementById(fields[field]).value = value;
  }
}

function open() {
  let data = JSON.parse(localStorage.getItem('data'));
  if (data != null)
    setValues(data);
  else
    setValues(defaults);
}

function save() {
  let data = {};
  for (var field in fields) {
    let value = (document.getElementById(fields[field]).value != null) ? document.getElementById(fields[field]).value : '';
    data[fields[field]] = value;
  }
  localStorage.setItem('data', JSON.stringify(data));
}

function csvExport() {
  let csvContent = 'data:text/csv;charset=utf-8,';

  let headerRow = fields.join(',');
  csvContent += headerRow + "\r\n";

  fields.forEach(function (field) {
    let data = document.getElementById(field).value;
    csvContent += data + ',';
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'time.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
}

/* Initialization
   ========================================================================== */

let splash = document.createElement("div");
splash.classList.add("splash");
document.querySelector("body").append(splash);
setTimeout(() => {
  splash.remove();
}, 2200);

var inputs = document.querySelectorAll('input[data-type="time"]');
for (var input in inputs) {
  if (inputs[input].addEventListener != null) {
    inputs[input].addEventListener('keyup', function (e) {
      calculateTimes(e);
    });
  }
}
var buttons = document.querySelectorAll('time-button');
for (var button in buttons) {
  if (buttons[button].addEventListener != null) {
    buttons[button].addEventListener('click', function (e) {
      calculateTimes(e);
    });
  }
}

document.getElementById('btn-new').addEventListener('click', () => setValues(empty));
document.getElementById('btn-open').addEventListener('click', open);
document.getElementById('btn-save').addEventListener('click', save);
document.getElementById('btn-export').addEventListener('click', csvExport);

setValues(defaults);
calculateTimes();