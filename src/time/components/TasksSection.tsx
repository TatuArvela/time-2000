import {
  Fieldset,
  TextInput,
  Time as TimeType,
  TimeInput,
} from '@tatuarvela/wisp';
import { Fragment } from 'react';

import { useValues } from '../ValuesContext.tsx';
import ControlGrid from './ControlGrid.tsx';

const TasksSection = () => {
  const { values, onChange, value } = useValues();
  const { tasks } = values;

  return (
    <Fieldset legend="Tasks">
      <ControlGrid>
        {tasks.map((_task, index) => {
          const taskTimeKey = `task${index}time`;
          const taskDescriptionKey = `task${index}description`;
          return (
            <Fragment key={`task${index}`}>
              <TimeInput
                onChange={onChange(taskTimeKey)}
                value={value(taskTimeKey) as TimeType}
                label={index === 0 ? 'Time' : undefined}
              />
              <TextInput
                onChange={onChange(taskDescriptionKey)}
                value={value(taskDescriptionKey) as string}
                label={index === 0 ? 'Description' : undefined}
              />
            </Fragment>
          );
        })}
      </ControlGrid>
    </Fieldset>
  );
};

export default TasksSection;
