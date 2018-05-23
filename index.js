function getValue(id) {
  var value = document.getElementById(id).value;
  return (value != '' ? value : '00:00');
}

function subtractTime(time1, time2) {
  return moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm'))).format('HH:mm');
}

function inputChangeHandler() {
  var output = subtractTime(getValue('stop'), getValue('start'));
  output = subtractTime(output, getValue('lunch'));
  output = subtractTime(output, getValue('breaks'));
  output = subtractTime(output, getValue('task1'));
  output = subtractTime(output, getValue('task2'));
  output = subtractTime(output, getValue('task3'));
  output = subtractTime(output, getValue('task4'));
  output = subtractTime(output, getValue('task5'));
  output = subtractTime(output, getValue('task6'));

  document.getElementById('unregistered').value = output;
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