/*
  Shell
*/

function makeWindowActive() {
  $('.active').removeClass('active');
  $(this).addClass('active');
}

$(document).ready(function() {
  $('.window').draggable({
    start: makeWindowActive,
    handle: 'header',
    containment: 'body'
  });
  
  $('.window').click(makeWindowActive)  

  $('#sakura-time').resizable({
    start: makeWindowActive,
    containment: 'body'
  });
});


/*
  Theme switcher
*/

function setTheme(theme) {
  $('#theme').prop('href', 'themes/' + theme +'.css');
}

$('#theme-selector').change(function() {
  if ($(this).val()) {
    $('#theme').prop('disabled', false);
    setTheme($(this).val());
  }
  else {
    $('#theme').prop('disabled', true);
    setTheme('');
  }
})

$(document).ready(function() {
  setTheme($('#theme-selector').val())
});


/*
  Sakura Time 2000
*/

function getValue(id) {
  var value = document.getElementById(id).value;
  return (value != '' ? value : '00:00');
}

function subtractTime(time1, time2) {
  return moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');
}

function inputChangeHandler() {
  var totalTime = subtractTime(getValue('stop'), getValue('start'));
  totalTime = subtractTime(totalTime, getValue('lunch'));
  totalTime = subtractTime(totalTime, getValue('breaks'));

  var unloggedTime = subtractTime(totalTime, getValue('task1'));
  unloggedTime = subtractTime(unloggedTime, getValue('task2'));
  unloggedTime = subtractTime(unloggedTime, getValue('task3'));
  unloggedTime = subtractTime(unloggedTime, getValue('task4'));
  unloggedTime = subtractTime(unloggedTime, getValue('task5'));
  unloggedTime = subtractTime(unloggedTime, getValue('task6'));

  var timeDifference;
  if (getValue('planned') > totalTime) {
    document.getElementById('differenceTitle').innerHTML = 'Missing time';
    var timeDifference = subtractTime(getValue('planned'), totalTime);
  }
  else {
    document.getElementById('differenceTitle').innerHTML = 'Overtime';
    var timeDifference = subtractTime(totalTime, getValue('planned'));
  }

  document.getElementById('total').value = totalTime;
  document.getElementById('unlogged').value = unloggedTime;
  document.getElementById('difference').value = timeDifference;
}

inputChangeHandler();

var inputs = document.getElementsByTagName('input');
for (var input in inputs) {
  if (inputs[input].addEventListener != null)
    inputs[input].addEventListener('change', inputChangeHandler);
}