import { defaults } from './globals';
import { addToolbarFunctions } from './toolbar';
import calculateTimes from './calculation';
import {
  dataGetter, dataSetter, valueGetter, valueSetter,
} from './utilities';

const splashScreenDuration = 2200;

const Time = (shell) => {
  const applicationWindow = shell.element.querySelector('.window#time-2000');
  if (!applicationWindow) throw Error('Time 2000 start up failed: No app window defined');

  // --- //

  const getData = dataGetter(appWindow);
  const setData = dataSetter(appWindow);
  const getValue = valueGetter(appWindow);
  const setValue = valueSetter(appWindow);

  const initializeInputs = () => {
    const inputs = appWindow.querySelectorAll('input[data-type="time"]');
    for (const input in inputs) {
      if (inputs[input].addEventListener != null) {
        inputs[input].addEventListener('keyup', () => {
          calculateTimes(getValue, setValue);
        });
      }
    }
  };

  const initializeButtons = () => {
    const buttons = appWindow.querySelectorAll('time-button');
    for (const button in buttons) {
      if (buttons[button].addEventListener != null) {
        buttons[button].addEventListener('click', () => {
          calculateTimes(getValue, setValue);
        });
      }
    }
  };

  const initialize = () => {
    initializeInputs();
    initializeButtons();
    addToolbarFunctions(appWindow.querySelector('.toolbar'), getData, setData);

    setData(defaults);
    calculateTimes(getValue, setValue);
  };

  const showSplashScreen = (callback) => {
    const splashScreen = document.createElement('div');
    splashScreen.classList.add('splash');
    document.querySelector('body').append(splashScreen);
    setTimeout(() => {
      splashScreen.remove();
      callback();
    }, splashScreenDuration);
  };

  showSplashScreen(() => initialize());

  // --- //

  return {
    applicationWindow,
  };
};

export default Time;
