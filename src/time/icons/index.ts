import { Icon } from '@tatuarvela/wisp';

import iconExport from './icon-export.png';
import iconNew from './icon-new.png';
import iconOpen from './icon-open.png';
import iconSave from './icon-save.png';
import iconTime from './icon-time.png';

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
