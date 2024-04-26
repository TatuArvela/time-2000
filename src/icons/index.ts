import { Icon } from '@tatuarvela/wisp';

import iconExport from './assets/icon-export.png';
import iconNew from './assets/icon-new.png';
import iconOpen from './assets/icon-open.png';
import iconSave from './assets/icon-save.png';
import iconTime from './assets/icon-time.png';

const icons: Record<string, Icon> = {
  time: {
    16: iconTime,
  },
  export: {
    16: iconExport,
  },
  new: {
    16: iconNew,
  },
  open: {
    16: iconOpen,
  },
  save: {
    16: iconSave,
  },
};

export default icons;
