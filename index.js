function getValue(id) {
  var value = document.getElementById(id).value;
  return (value != "" ? value : "00:00");
}

function subtractTime(time1, time2) {
  return moment.utc(moment(time1, "HH:mm").diff(moment(time2, "HH:mm"))).format("HH:mm");
}

function inputChangeHandler() {
  var output = subtractTime(getValue("stop"), getValue("start"));
  output = subtractTime(output, getValue("lunch"));
  output = subtractTime(output, getValue("breaks"));
  output = subtractTime(output, getValue("task1"));
  output = subtractTime(output, getValue("task2"));
  output = subtractTime(output, getValue("task3"));
  output = subtractTime(output, getValue("task4"));
  output = subtractTime(output, getValue("task5"));
  output = subtractTime(output, getValue("task6"));

  document.getElementById("unregistered").value = output;
}

inputChangeHandler();

var inputs = document.getElementsByTagName("input");
for (var input in inputs) {
  if (inputs[input].addEventListener != null)
    inputs[input].addEventListener("change", inputChangeHandler);
}



function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-title")) {
    document.getElementById(elmnt.id + "-title").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById(("sakura-window")));