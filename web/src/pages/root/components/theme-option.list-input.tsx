import { ListInput } from 'konsta/react';
import { useThemeStore } from '../../../themes';
import { useEffect, useState } from 'react';

interface ThemeOptionListInputProps {
  index: number;
  optionKey: string;
  description?: string;
  defaultValue: string | number;
  type: typeof String | typeof Number;
}

const ThemeOptionListInput = (props: ThemeOptionListInputProps) => {
  const { index, optionKey, description, defaultValue, type } = props;
  const { option, setOption } = useThemeStore();
  const [value, setValue] = useState(option.get(optionKey) ?? defaultValue);

  useEffect(() => {
    setValue(option.get(optionKey) ?? defaultValue);
  }, [option, optionKey, defaultValue]);

  return (
    <ListInput
      key={index}
      name={optionKey}
      title={optionKey}
      info={description}
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        if (type === Number) {
          if (isNaN(Number(value))) {
            setOption(optionKey, defaultValue);
          } else {
            setOption(optionKey, Number(value));
          }
        } else {
          setOption(optionKey, value);
        }
        setValue(value);
      }}
    />
  );
};

export default ThemeOptionListInput;
