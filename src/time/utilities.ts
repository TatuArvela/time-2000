import { fields } from './globals';

const dataGetter = (appWindow) => () => {
  const data = {};
  fields.forEach((field) => {
    data[fields[field]] = appWindow.querySelector(`#${fields[field]}`).value != null
      ? appWindow.querySelector(`#${fields[field]}`).value
      : '';
  });
  return data;
};

const dataSetter = (appWindow) => (values) => {
  fields.forEach((field) => {
    const value = values[fields[field]] != null ? values[fields[field]] : '';
    const target = appWindow.querySelector(`#${fields[field]}`);
    target.value = value;
  });
};

const valueGetter = (appWindow) => (id) => {
  const { value } = appWindow.querySelector(`#${id}`);
  return value !== '' ? value : '00:00';
};

const valueSetter = (appWindow) => (id, value) => {
  const target = appWindow.querySelector(`#${id}`);
  target.value = value;
};

export {
  dataGetter, dataSetter, valueGetter, valueSetter,
};
