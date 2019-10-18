import {
  defaults
} from './data';
import {
  addToolbarFunctions
} from './toolbar';
import {
  calculateTimes
} from './calculation';
import {
  dataGetter,
  dataSetter,
  valueGetter,
  valueSetter
} from "./utilities";

const Time2000 = (target) => {
  const appWindow = target.querySelector(".window#time-2000");

  const getData = dataGetter(appWindow);
  const setData = dataSetter(appWindow);
  const getValue = valueGetter(appWindow);
  const setValue = valueSetter(appWindow);

  const throwSplash = (callback) => {
    const splash = document.createElement("div");
    splash.classList.add("splash");
    document.querySelector("body").append(splash);
    setTimeout(() => {
      splash.remove();
      callback();
    }, 2200);
  }

  const initializeInputs = () => {
    const inputs = appWindow.querySelectorAll('input[data-type="time"]');
    for (const input in inputs) {
      if (inputs[input].addEventListener != null) {
        inputs[input].addEventListener('keyup', () => {
          calculateTimes(getValue, setValue);
        });
      }
    }
  }

  const initializeButtons = () => {
    const buttons = appWindow.querySelectorAll('time-button');
    for (const button in buttons) {
      if (buttons[button].addEventListener != null) {
        buttons[button].addEventListener('click', () => {
          calculateTimes(getValue, setValue);
        });
      }
    }
  }

  const initialize = () => {
    initializeInputs();
    initializeButtons();
    addToolbarFunctions(appWindow.querySelector('.toolbar'), getData, setData);

    setData(defaults);
    calculateTimes(getValue, setValue);
  }

  throwSplash(() => initialize());

  return {
    appWindow,
  };
}

export default Time2000;