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

  const getData = dataGetter(applicationWindow);
  const setData = dataSetter(applicationWindow);
  const getValue = valueGetter(applicationWindow);
  const setValue = valueSetter(applicationWindow);

  const initializeInputs = () => {
    const inputs = applicationWindow.querySelectorAll('input[data-type="time"]');

    inputs.forEach((input) => {
      if (inputs[input].addEventListener != null) {
        inputs[input].addEventListener('keyup', () => {
          calculateTimes(getValue, setValue);
        });
      }
    });
  };

  const initializeButtons = () => {
    const buttons = applicationWindow.querySelectorAll('time-button');
    buttons.forEach((button) => {
      if (buttons[button].addEventListener != null) {
        buttons[button].addEventListener('click', () => {
          calculateTimes(getValue, setValue);
        });
      }
    });
  };

  const initialize = () => {
    initializeInputs();
    initializeButtons();
    addToolbarFunctions(applicationWindow.querySelector('.toolbar'), getData, setData);

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
