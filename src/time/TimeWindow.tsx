import { Window } from '@tatuarvela/wisp';
import { useEffect, useState } from 'react';

import Splash from './components/Splash.tsx';
import icons from './icons';
import TimeApp from './TimeApp.tsx';

const TimeWindow = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 2000);
  }, []);

  if (!isReady) {
    return <Splash />;
  }

  return (
    <Window
      id="time-2000"
      title="Sakura Time 2000"
      icon={icons.time}
      width={360}
      height={515}
      isClosable={false}
      isMinimizable={true}
      isMaximizable={false}
      alwaysShowCloseButton={true}
    >
      <TimeApp />
    </Window>
  );
};

export default TimeWindow;
