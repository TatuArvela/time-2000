const toolbar = () => {
  return `
<div class="toolbar">
  <button class="toolbar__button time2k__button--new" id="btn-new"></button>
  <button class="toolbar__button time2k__button--open" id="btn-open"></button>
  <button class="toolbar__button time2k__button--save" id="btn-save"></button>
  <button class="toolbar__button time2k__button--export" id="btn-export"></button>
</div>`
}

const form = () => {
  return `
  <div class="well">
  <fieldset>
    <legend>Working time</legend>
    <div class="row">
      <div class="col">
        <label>Start</label>
        <input class="form__input" id="start" data-type="time" />
      </div>
      <div class="col">
        <label>End</label>
        <input class="form__input" id="stop" data-type="time" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Lunch break</label>
        <input class="form__input" id="lunch" data-type="time" />
      </div>
      <div class="col">
        <label>Other breaks</label>
        <input class="form__input" id="breaks" data-type="time" />
      </div>
    </div>
  </fieldset>
  <fieldset>
    <legend>Tasks</legend>
    <div class="row">
      <div class="col">
        <label>Time</label>
        <input class="form__input" id="task1time" data-type="time" />
      </div>
      <div class="col">
        <label>Description</label>
        <input class="form__input" id="task1desc" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form__input" id="task2time" data-type="time" />
      </div>
      <div class="col">
        <input class="form__input" id="task2desc" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form__input" id="task3time" data-type="time" />
      </div>
      <div class="col">
        <input class="form__input" id="task3desc" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form__input" id="task4time" data-type="time" />
      </div>
      <div class="col">
        <input class="form__input" id="task4desc" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form__input" id="task5time" data-type="time" />
      </div>
      <div class="col">
        <input class="form__input" id="task5desc" type="text" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form__input" id="task6time" data-type="time" />
      </div>
      <div class="col">
        <input class="form__input" id="task6desc" type="text" />
      </div>
    </div>
  </fieldset>
  <fieldset>
    <legend>Report</legend>
    <div class="row">
      <div class="col">
        <label class="disabled">Total hours</label>
        <input class="form__input" id="total" disabled />
      </div>
      <div class="col">
        <label class="disabled">Unlogged time</label>
        <input class="form__input" id="unlogged" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label class="disabled">Planned hours</label>
        <input class="form__input" id="planned" data-type="time" />
      </div>
      <div class="col">
        <label class="disabled">Difference</label>
        <input class="form__input" id="difference" disabled />
      </div>
    </div>
  </fieldset>
</div>`
}

const statusBar = () => {
  return `
<div class="status-bar">
  <div class="well"></div>
  <div class="resize-handle"></div>
</div>`
}

const createWindow = () => {
  return `
  ${toolbar}
  ${form}
  ${statusBar}
`
};

/*
 <div class="window" id="time-2000">
  <div class="window__title window__title--has-icon">
    <img src="../icons/16/application.png" alt="Sakura Time 2000" class="window__title__icon" />Sakura Time 2000
  </div>
*/

export default createWindow;
