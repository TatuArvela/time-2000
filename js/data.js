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

export {
  defaults,
  empty,
  fields,
}