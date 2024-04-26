import { StatusBar, StatusBarSection, WindowContent } from '@tatuarvela/wisp';

import ReportSection from './components/ReportSection.tsx';
import TasksSection from './components/TasksSection.tsx';
import TimeToolbar from './components/TimeToolbar.tsx';
import WorkingTimeSection from './components/WorkingTimeSection.tsx';
import { ValuesProvider } from './ValuesContext.tsx';

const TimeApp = () => {
  return (
    <ValuesProvider>
      <TimeToolbar />
      <WindowContent
        style={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <WorkingTimeSection />
        <TasksSection />
        <ReportSection />
      </WindowContent>
      <StatusBar showResizeHandle>
        <StatusBarSection></StatusBarSection>
      </StatusBar>
    </ValuesProvider>
  );
};

export default TimeApp;
