import {
  fields,
  empty,
  defaults
} from './data';

const newTimesheet = (setData) => {
  setData(empty);
}

const open = (setData) => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data != null)
    setData(data);
  else
    setData(defaults);
}

const save = getData => {
  localStorage.setItem('data', JSON.stringify(getData()));
}

const csvExport = (getData) => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  const headerRow = fields.join(',');
  csvContent += headerRow + "\r\n";

  const data = getData();
  fields.forEach(function (field) {
    csvContent += data[field] + ',';
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'time.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
}

const addToolbarFunctions = (toolbar, getData, setData) => {
  toolbar.querySelector('#btn-new').addEventListener('click', () => newTimesheet(setData));
  toolbar.querySelector('#btn-open').addEventListener('click', () => open(setData));
  toolbar.querySelector('#btn-save').addEventListener('click', () => save(getData));
  toolbar.querySelector('#btn-export').addEventListener('click', () => csvExport(getData));
}

export {
  addToolbarFunctions
}