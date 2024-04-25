import { ListInput, ListItem, Toggle } from 'konsta/react';
import { useThemeStore } from '../themes';
import { useEffect, useState } from 'react';
import { useStore } from '../store';

interface ThemeOptionListInputProps {
  index: number;
  optionKey: string;
  description?: string;
  defaultValue: string | number;
  type: typeof String | typeof Number | typeof Boolean;
}

const ThemeOptionListInput = (props: ThemeOptionListInputProps) => {
  const { index, optionKey, description, defaultValue, type } = props;
  const { option, setOption } = useThemeStore();
  const { selectedThemeName } = useStore();
  const [value, setValue] = useState(option.get(optionKey) ?? defaultValue);

  useEffect(() => {
    setValue(option.get(optionKey) ?? defaultValue);
  }, [option, optionKey, defaultValue, selectedThemeName]);

  return (
    <>
      {type === Number && (
        <ListInput
          key={index}
          name={optionKey}
          title={optionKey}
          info={description}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            if (isNaN(Number(value))) setOption(optionKey, defaultValue);
            else setOption(optionKey, Number(value));
            setValue(value);
          }}
        />
      )}

      {type === String && (
        <ListInput
          key={index}
          name={optionKey}
          title={optionKey}
          info={description}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            setOption(optionKey, value);
            setValue(value);
          }}
        />
      )}

      {type === Boolean && (
        <ListItem
          key={index}
          title={optionKey}
          footer={description}
          after={
            <Toggle
              checked={value as boolean}
              onChange={() => {
                setOption(optionKey, !value);
                setValue(!value);
              }}
            />
          }
        />
      )}
    </>
  );
};

export default ThemeOptionListInput;
