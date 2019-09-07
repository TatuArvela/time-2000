import moment from "moment";

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

export default class Time2000 {

  constructor(target) {
    this.window = target.querySelector(".window#time-2000");
    this.throwSplash(() => this.initialize());
  }

  initialize() {
    this.initializeInputs();
    this.initializeButtons();
    this.addToolbarFunctions();

    this.setValues(defaults);
    this.calculateTimes();
  }

  throwSplash(callback) {
    let splash = document.createElement("div");
    splash.classList.add("splash");
    document.querySelector("body").append(splash);
    setTimeout(() => {
      splash.remove();
      callback();
    }, 2200);
  }

  addToolbarFunctions() {
    this.window.querySelector('#btn-new').addEventListener('click', () => this.newTimesheet());
    this.window.querySelector('#btn-open').addEventListener('click', e => this.open(e));
    this.window.querySelector('#btn-save').addEventListener('click', e => this.save(e));
    this.window.querySelector('#btn-export').addEventListener('click', e => this.csvExport(e));
  }

  initializeInputs() {
    let inputs = this.window.querySelectorAll('input[data-type="time"]');
    for (var input in inputs) {
      if (inputs[input].addEventListener != null) {
        inputs[input].addEventListener('keyup', e => {
          this.calculateTimes(e);
        });
      }
    }
  }

  initializeButtons() {
    let buttons = this.window.querySelectorAll('time-button');
    for (var button in buttons) {
      if (buttons[button].addEventListener != null) {
        buttons[button].addEventListener('click', e => {
          this.calculateTimes(e);
        });
      }
    }
  }

  getValue(id) {
    var value = this.window.querySelector(`#${id}`).value;
    return (value != '' ? value : '00:00');
  }

  subtractTime(time1, time2) {
    return moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');
  }

  calculateTimes() {
    var totalTime = this.subtractTime(this.getValue('stop'), this.getValue('start'));
    totalTime = this.subtractTime(totalTime, this.getValue('lunch'));
    totalTime = this.subtractTime(totalTime, this.getValue('breaks'));

    var unloggedTime = this.subtractTime(totalTime, this.getValue('task1time'));
    unloggedTime = this.subtractTime(unloggedTime, this.getValue('task2time'));
    unloggedTime = this.subtractTime(unloggedTime, this.getValue('task3time'));
    unloggedTime = this.subtractTime(unloggedTime, this.getValue('task4time'));
    unloggedTime = this.subtractTime(unloggedTime, this.getValue('task5time'));
    unloggedTime = this.subtractTime(unloggedTime, this.getValue('task6time'));

    var timeDifference;
    if (this.getValue('planned') >= totalTime) {
      var timeDifference = this.subtractTime(this.getValue('planned'), totalTime);
    }
 else {
      var timeDifference = '-' + this.subtractTime(totalTime, this.getValue('planned'));
    }

    this.window.querySelector('#total').value = totalTime;
    this.window.querySelector('#unlogged').value = unloggedTime;
    this.window.querySelector('#difference').value = timeDifference;
  }

  setValues(values) {
    for (var field in fields) {
      let value = (values[fields[field]] != null) ? values[fields[field]] : '';
      this.window.querySelector(`#${fields[field]}`).value = value;
    }
  }

  newTimesheet() {
    this.setValues(empty);
  }

  open() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data != null)
      setValues(data);
    else
      setValues(defaults);
  }

  save() {
    let data = {};
    for (var field in fields) {
      let value = (this.window.querySelector(`#${fields[field]}`).value != null) ? this.window.querySelector(`#${fields[field]}`).value : '';
      data[fields[field]] = value;
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  csvExport() {
    let csvContent = 'data:text/csv;charset=utf-8,';

    let headerRow = fields.join(',');
    csvContent += headerRow + "\r\n";

    fields.forEach(function (field) {
      let data = this.window.querySelector(`#${field}`).value;
      csvContent += data + ',';
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'time.csv');
    document.body.appendChild(link); // Required for FF

    link.click();
  }
}