import { Time, Time as TimeType } from '@tatuarvela/wisp';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import { defaults } from './functions/initializeValues.ts';
import { buildValueGetter, updateValues } from './functions/valueState.ts';
import { ValueGetter, ValueKey, Values } from './types.ts';

type ValuesContextType = {
  values: Values;
  setValues: Dispatch<SetStateAction<Values>>;
  value: ValueGetter;
  onChange: (valueKey: ValueKey) => (value: Time | string) => void;
};

export const ValuesContext = createContext<ValuesContextType>({
  values: defaults,
  setValues: () => defaults,
  value: buildValueGetter(defaults),
  onChange: () => () => undefined,
});

export const ValuesProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<Values>(defaults);
  const value = buildValueGetter(values);
  const onChange = (valueKey: ValueKey) => (value: Time | string) =>
    setValues(updateValues(valueKey, value));

  return (
    <ValuesContext.Provider value={{ values, setValues, value, onChange }}>
      {children}
    </ValuesContext.Provider>
  );
};

export const useValues = (): ValuesContextType => {
  const { values, setValues } = useContext(ValuesContext);
  const onChange = useMemo(
    () => (valueKey: ValueKey) => (value: TimeType | string) =>
      setValues(updateValues(valueKey, value)),
    [setValues]
  );
  const value = useMemo(() => buildValueGetter(values), [values]);

  return { values, setValues, value, onChange };
};
