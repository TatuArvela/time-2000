import { Fieldset, TextInput, Time, TimeInput } from '@tatuarvela/wisp';

import { calculateTimes } from '../functions/timeCalculation.ts';
import { useValues } from '../ValuesContext.tsx';
import ControlGrid from './ControlGrid.tsx';

const ReportSection = () => {
  const { onChange, value, values } = useValues();
  const { totalTime, unloggedTime, timeDifference } = calculateTimes(values);

  return (
    <Fieldset legend="Report">
      <ControlGrid>
        <TextInput
          onChange={() => undefined}
          value={totalTime}
          label="Total hours"
          disabled
        />
        <TextInput
          onChange={() => undefined}
          value={unloggedTime}
          label="Unlogged time"
          disabled
        />
        <TimeInput
          onChange={onChange('planned')}
          value={value('planned') as Time}
          label="Planned hours"
        />
        <TextInput
          onChange={() => undefined}
          value={timeDifference}
          label="Difference"
          disabled
        />
      </ControlGrid>
    </Fieldset>
  );
};

export default ReportSection;
