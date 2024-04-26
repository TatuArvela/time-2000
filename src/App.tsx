import {
  Wisp,
  Window,
  WindowContent,
  Toolbar,
  ToolbarButton,
  StatusBar,
  StatusBarSection,
  ThemeSwitcher, Fieldset, TimeInput, TextInput
} from "@tatuarvela/wisp";
import {
  vaporwin,
  win2k,
  win9x16Bit,
  win9x16Colors,
  win9x24Bit,
  win9x256Colors,
  win9x32Bit
} from "@tatuarvela/wisp-win-classic-theme";
import ControlGrid from "./ControlGrid.tsx";
import {Fragment} from "react";
import icons from "./icons.ts";

const tasks = [
  1,
  2,
  3,
  4,
  5,
  6,
];

function App() {
  return (
    <Wisp themes={[
      win9x16Colors,
      win9x256Colors,
      win9x16Bit,
      win9x24Bit,
      win9x32Bit,
      win2k,
      vaporwin,
    ]}>
      <ThemeSwitcher />
      <Window id="time-2000" title="Time 2000" width={360} height={532} isClosable={false} isMinimizable={true} isMaximizable={false} alwaysShowCloseButton={true}>
        <Toolbar>
          <ToolbarButton icon={icons.new} />
          <ToolbarButton icon={icons.open} />
          <ToolbarButton icon={icons.save} />
          <ToolbarButton icon={icons.export} />
        </Toolbar>
        <WindowContent style={{padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <Fieldset legend="Working time">
            <ControlGrid>
              <TimeInput onChange={() => undefined} label="Start" />
              <TimeInput onChange={() => undefined} label="End" />
              <TimeInput onChange={() => undefined} label="Lunch break" />
              <TimeInput onChange={() => undefined} label="Other breaks" />
            </ControlGrid>
          </Fieldset>
          <Fieldset legend="Tasks">
            <ControlGrid>
              {tasks.map((task, index) => (<Fragment key={task}>
                <TimeInput onChange={() => undefined} label={index === 0 ? 'Time' : undefined} />
                <TextInput onChange={() => undefined} label={index === 0 ? 'Description' : undefined} />
              </Fragment>))}
            </ControlGrid>
          </Fieldset>
          <Fieldset legend="Report">
            <ControlGrid>
              <TextInput onChange={() => undefined} label="Total hours" disabled />
              <TextInput onChange={() => undefined} label="Unlogged time" disabled />
              <TimeInput onChange={() => undefined} label="Planned hours" />
              <TextInput onChange={() => undefined} label="Difference" disabled />
            </ControlGrid>
          </Fieldset>
        </WindowContent>
        <StatusBar showResizeHandle>
          <StatusBarSection></StatusBarSection>
        </StatusBar>
      </Window>
    </Wisp>
  )
}

export default App
