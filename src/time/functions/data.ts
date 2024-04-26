import { baseValueKeys, Values } from '../types.ts';
import { defaults } from './initializeValues.ts';
import { formatTime } from './timeCalculation.ts';

export const data = 'placeholder';

export function openFromStorage(): Values {
  const data = localStorage.getItem('data');
  if (data !== null) return JSON.parse(data);
  else return defaults;
}

export function saveToStorage(values: Values) {
  localStorage.setItem('data', JSON.stringify(values));
}

type FlatValues = Record<string, string>;

function flattenValues(values: Values): FlatValues {
  const flatValues: FlatValues = {};

  baseValueKeys.forEach((key) => {
    flatValues[key] = formatTime(values[key]);
  });

  values.tasks.forEach((task, index) => {
    flatValues[`task${index}time`] = formatTime(task.time);
    flatValues[`task${index}description`] = task.description;
  });

  return flatValues;
}

export function csvExport(values: Values) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  const flatValues = flattenValues(values);

  const headerRow = Object.keys(flatValues).join(',');
  csvContent += headerRow + '\r\n';

  const valueRow = Object.values(flatValues).join(',');
  csvContent += valueRow;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'time.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
}
