import { Toolbar, ToolbarButton } from '@tatuarvela/wisp';

import {
  csvExport,
  openFromStorage,
  saveToStorage,
} from '../functions/data.ts';
import { defaults } from '../functions/initializeValues.ts';
import icons from '../icons';
import { useValues } from '../ValuesContext.tsx';

const TimeToolbar = () => {
  const { values, setValues } = useValues();
  return (
    <Toolbar>
      <ToolbarButton icon={icons.new} onClick={() => setValues(defaults)} />
      <ToolbarButton
        icon={icons.open}
        onClick={() => setValues(openFromStorage())}
      />
      <ToolbarButton icon={icons.save} onClick={() => saveToStorage(values)} />
      <ToolbarButton icon={icons.export} onClick={() => csvExport(values)} />
    </Toolbar>
  );
};

export default TimeToolbar;
