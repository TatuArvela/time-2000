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

import Time from './Time.tsx';

function App() {
  return (
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
      <Time />
    </Wisp>
  );
}

export default App;
