import { ThemeSwitcher, Wisp } from '@tatuarvela/wisp';
import {
  vaporwin,
  win2k,
  win9x16Bit,
  win9x16Colors,
  win9x24Bit,
  win9x32Bit,
  win9x256Colors,
} from '@tatuarvela/wisp-win-classic-theme';

import TimeWindow from './time/TimeWindow.tsx';

const App = () => (
  <Wisp
    themes={[
      win9x16Colors,
      win9x256Colors,
      win9x16Bit,
      win9x24Bit,
      win9x32Bit,
      win2k,
      vaporwin,
    ]}
  >
    <ThemeSwitcher height={50} />
    <TimeWindow />
  </Wisp>
);

export default App;
