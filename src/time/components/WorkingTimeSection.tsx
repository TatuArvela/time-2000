import { Fieldset, Time, TimeInput } from '@tatuarvela/wisp';

import { useValues } from '../ValuesContext.tsx';
import ControlGrid from './ControlGrid.tsx';

const WorkingTimeSection = () => {
  const { onChange, value } = useValues();
  return (
    <Fieldset legend="Working time">
      <ControlGrid>
        <TimeInput
          onChange={onChange('start')}
          value={value('start') as Time}
          label="Start"
        />
        <TimeInput
          onChange={onChange('stop')}
          value={value('stop') as Time}
          label="End"
        />
        <TimeInput
          onChange={onChange('lunch')}
          value={value('lunch') as Time}
          label="Lunch break"
        />
        <TimeInput
          onChange={onChange('breaks')}
          value={value('breaks') as Time}
          label="Other breaks"
        />
      </ControlGrid>
    </Fieldset>
  );
};

export default WorkingTimeSection;
