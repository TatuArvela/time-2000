/*
  Window system
*/

function makeActive(event) {
  document.querySelectorAll('.window.active')[0].classList.remove('active');
  if ($(this) != null) {
    $(this).addClass('active');
  }
 else {
    event.target.classList.add('active');
  }
}

var windows = document.querySelectorAll('.window');
for (let i = 0; i < windows.length; i++) {
  windows[i].onmousedown = makeActive;
}

$('.window').draggable({
  start: makeActive,
  handle: 'header',
  containment: 'body'
});

$('#sakura-time').resizable({
  start: makeActive,
  containment: 'body'
});


/* 
  Time inputs
*/

function handleTimeButtonClick(eventTarget) {
  let [method, target] = eventTarget.split("-");
  document.getElementById(target).focus();
  let activeInput = document.activeElement;
  if (activeInput.getAttribute('id') != target) {
    document.activeElement = document.getElementById(target);
  }
  let keyCode = (method == "dec") ? 40 : 38;
  $(activeInput).trigger({type: 'keypress', which: keyCode, keyCode: keyCode});
}

function createTimeButtons(input) {
  const increase = document.createElement('button');
  increase.setAttribute('class', 'time-button time-increase');
  increase.setAttribute('id', 'inc-' + input.getAttribute('id'));
  increase.setAttribute('tabIndex', '-1');
  increase.addEventListener('mousedown', function (event) {
    event.preventDefault();
    event.target.classList.add('active');
    handleTimeButtonClick(event.target.getAttribute('id'));
  });
  increase.addEventListener('mouseup', function (event) {
    event.target.classList.remove('active');
  });

  const decrease = document.createElement('button');
  decrease.setAttribute('class', 'time-button time-decrease');
  decrease.setAttribute('id', 'dec-' + input.getAttribute('id'));
  decrease.setAttribute('tabIndex', '-1');
  decrease.addEventListener('mousedown', function (event) {
    event.preventDefault();
    event.target.classList.add('active');
    handleTimeButtonClick(event.target.getAttribute('id'));
  });
  decrease.addEventListener('mouseup', function (event) {
    event.target.classList.remove('active');
  });

  input.after(decrease);
  input.after(increase);
}

function handleTimeBlur(e) {
  let values = e.target.value.split(':');

  if (values.length === 2) {
    values[0] = values[0].trim().substring(0, 2);
    values[1] = values[1].trim().substring(0, 2);
    if (!parseInt(values[0]) || values[0] > 23 || values[0] < 0) values[0] = "00";
    if (!parseInt(values[1]) || values[1] > 59 || values[1] < 0) values[1] = "00";
  }
  else if (values.length === 1) {
    values[1] = "00";
  }
  else {
    values = ["00", "00"]
  }

  e.target.value = moment(values[0] + ':' + values[1], "HH:mm").format('HH:mm');
}

function handleTimeKeypress(e) {
  if (e.keyCode == 38 || e.keyCode == 40) {
    let start = document.activeElement.selectionStart;
    let end = document.activeElement.selectionEnd;

    let time = moment(e.target.value, 'HH:mm');

    let unit = (end < 3) ? 'hours' : 'minutes';
    (e.keyCode == 38) ? time.add(1, unit) : time.subtract(1, unit);
    e.target.value = time.format('HH:mm');

    document.activeElement.setSelectionRange(start, end);
    e.preventDefault();
  }
}

var timeInputs = document.querySelectorAll('input[data-type="time"]');
for (let i = 0; i < timeInputs.length; i++) {
  createTimeButtons(timeInputs[i]);
  timeInputs[i].onblur = handleTimeBlur;
  timeInputs[i].onkeydown = handleTimeKeypress;
  timeInputs[i].onkeypress = handleTimeKeypress;
}


/*
  Theme switcher
*/

function setTheme(theme) {
  document.getElementById('theme').setAttribute('href', 'themes/' + theme + '.css');
}

$('#theme-selector').selectmenu({
  width: 200,
  select: function (event) {
    if (event.target.value) {
      setTheme(event.target.value);
    }
    else {
      setTheme('');
    }
  }
});

setTheme(document.getElementById('theme-selector').value);