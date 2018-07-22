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

$( '#sakura-window' ).draggable({ containment: 'body', scroll: false });

$( '#switcher ').change(function() {
  switch($(this).val()) {
    case 'Plain':
      $('#theme-vapor').prop( 'disabled', true );
      $('#theme-extra').prop( 'disabled', true );
      break;
    case 'Calm':
      $('#theme-vapor').prop( 'disabled', false );
      $('#theme-extra').prop( 'disabled', true );
      break;
    case 'Fantastic':
      if ( !$( '#theme-extra' ).length )
        appendFantastic();
      $('#theme-vapor').prop( 'disabled', false );
      $('#theme-extra').prop( 'disabled', false );
      break;
  }
})

function appendFantastic() {
  var extra = document.createElement('link');
  extra.rel = 'stylesheet';
  extra.type = 'text/css';
  extra.href = 'extra.css';
  extra.id = 'theme-extra';
  extra.disabled = true;
  $( 'head' ).append(extra);
}