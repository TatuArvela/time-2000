import {
  fields,
} from './data';

const dataGetter = appWindow => () => {
  let data = {};
  for (var field in fields) {
    data[fields[field]] = (appWindow.querySelector(`#${fields[field]}`).value != null) ?
      appWindow.querySelector(`#${fields[field]}`).value :
      '';
  }
  return data;
}

const dataSetter = appWindow => values => {
  for (var field in fields) {
    const value = (values[fields[field]] != null) ? values[fields[field]] : '';
    appWindow.querySelector(`#${fields[field]}`).value = value;
  }
}

const valueGetter = appWindow => id => {
  const value = appWindow.querySelector(`#${id}`).value;
  return (value != '' ? value : '00:00');
}

const valueSetter = appWindow => (id, value) => {
  appWindow.querySelector(`#${id}`).value = value;
}

export {
  dataGetter,
  dataSetter,
  valueGetter,
  valueSetter
}