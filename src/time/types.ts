import { Time } from '@tatuarvela/wisp';

export const baseValueKeys = [
  'breaks',
  'lunch',
  'planned',
  'start',
  'stop',
] as const;

export type BaseValueKey = (typeof baseValueKeys)[number];

export type Task = {
  time: Time;
  description: string;
};

export type Values = Record<BaseValueKey, Time> & {
  tasks: Task[];
};

export type ValueKey = BaseValueKey | string;

export type ValueType = {
  [K in ValueKey]: K extends BaseValueKey ? Time : Time | string;
};

export type ValueGetter = <K extends ValueKey>(valueKey: K) => ValueType[K];
