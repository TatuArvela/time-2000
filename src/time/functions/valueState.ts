import { Time } from '@tatuarvela/wisp';

import {
  BaseValueKey,
  baseValueKeys,
  Task,
  ValueKey,
  Values,
  ValueType,
} from '../types.ts';

const isBaseValueKey = (valueKey: ValueKey): valueKey is BaseValueKey =>
  baseValueKeys.includes(valueKey as BaseValueKey);

const isTaskTimeKey = (valueKey: ValueKey) => valueKey.includes('time');

const isTaskDescriptionKey = (valueKey: ValueKey) =>
  valueKey.includes('description');

const getTaskIndex = (valueKey: ValueKey): number =>
  parseInt(valueKey.match(/\d+/)?.[0] ?? '0', 10);

const updateTasks = (
  valueKey: string,
  value: string | Time,
  tasks: Task[]
): Task[] => {
  const taskIndex = getTaskIndex(valueKey);

  const task = tasks[taskIndex];
  const updatedTask = {
    time: {
      hours: task.time.hours,
      minutes: task.time.minutes,
    },
    description: task.description,
  };

  if (isTaskTimeKey(valueKey)) {
    updatedTask.time = value as Time;
  } else if (isTaskDescriptionKey(valueKey)) {
    updatedTask.description = value as string;
  }

  tasks[taskIndex] = updatedTask;
  return tasks;
};

export const updateValues =
  (valueKey: ValueKey, value: string | Time) =>
  (prevState: Values): Values => {
    if (isBaseValueKey(valueKey)) {
      return {
        ...prevState,
        [valueKey as string]: value,
      };
    }

    return {
      ...prevState,
      tasks: updateTasks(valueKey, value, prevState.tasks),
    };
  };

export const buildValueGetter =
  (values: Values) =>
  <K extends ValueKey>(valueKey: K): ValueType[K] => {
    if (isBaseValueKey(valueKey)) {
      return values[valueKey];
    }

    const taskIndex = getTaskIndex(valueKey);
    const task = values.tasks[taskIndex];

    if (!task) throw new Error(`Task not found: ${valueKey}`);

    if (isTaskTimeKey(valueKey)) return task.time;
    if (isTaskDescriptionKey(valueKey)) return task.description;

    throw new Error(`Task key not parsed: ${valueKey}`);
  };
