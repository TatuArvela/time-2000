import { Time } from '@tatuarvela/wisp';

import { Task, Values } from '../types.ts';

const emptyTime: Time = {
  hours: 0,
  minutes: 0,
};

export const emptyTask: Task = {
  time: emptyTime,
  description: '',
};

const emptyTasks: Task[] = Array.from({ length: 6 }, () => emptyTask);

export const empty: Values = {
  breaks: emptyTime,
  lunch: emptyTime,
  planned: emptyTime,
  start: emptyTime,
  stop: emptyTime,
  tasks: emptyTasks,
};

export const defaults: Values = {
  breaks: emptyTime,
  start: {
    hours: 8,
    minutes: 30,
  },
  stop: {
    hours: 16,
    minutes: 30,
  },
  lunch: {
    hours: 0,
    minutes: 30,
  },
  planned: {
    hours: 7,
    minutes: 30,
  },
  tasks: emptyTasks,
};
