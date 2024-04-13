import { ListInput } from 'konsta/react';
import { useThemeStore } from '../../../themes';
import { useState } from 'react';

interface ThemeOptionListInputProps {
  index: number;
  key: string;
  description?: string;
  defaultValue: string | number;
  type: typeof String | typeof Number;
}

const ThemeOptionListInput = (props: ThemeOptionListInputProps) => {
  const { index, key, description, defaultValue, type } = props;
  const { option, setOption } = useThemeStore();
  const [value, setValue] = useState(option.get(key) ?? defaultValue);

  return (
    <ListInput
      key={index}
      name={key}
      title={key}
      info={description}
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        if (type === Number) {
          if (isNaN(Number(value))) setOption(key, defaultValue);
          else setOption(key, Number(value));
        } else {
          setOption(key, value);
        }
        setValue(value);
      }}
    />
  );
};

export default ThemeOptionListInput;
