import { ListInput, ListItem, Range, Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../store';
import Customize from '../database/customize';
import { ThemeOption, getConverter } from '../types/theme-option';

const ThemeOptionListInput = (props: ThemeOption) => {
  const { selectedThemeName, rerenderOptions, darkMode } = useStore();
  const [value, setValue] = useState(Customize.get(selectedThemeName, props.id, getConverter(props.type)) ?? props.default);

  useEffect(() => {
    setValue(Customize.get(selectedThemeName, props.id, getConverter(props.type)) ?? props.default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThemeName, rerenderOptions]);

  return (
    <>
      {props.type === 'number' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={props.id}
          info={props.description}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'string' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={props.id}
          info={props.description}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'color' && (
        <ListInput
          info={props.description}
          key={props.id}
          name={props.id}
          title={props.id}
          media={<div className="w-5 h-5" style={{ backgroundColor: value as string, outline: `1px solid ${darkMode ? '#fff' : '#000'}` }} />}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'select' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={props.id}
          info={props.description}
          value={value}
          type="select"
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
          dropdown
        >
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ListInput>
      )}

      {props.type === 'range-slider' && (
        <ListItem
          key={props.id}
          title={props.id}
          innerChildren={
            <div className="flex space-x-4 rtl:space-x-reverse">
              <span>{value}</span>
              <Range
                value={value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  Customize.set(selectedThemeName, props.id, value);
                  setValue(value);
                }}
              />
            </div>
          }
        />
      )}

      {props.type === 'boolean' && (
        <ListItem
          key={props.id}
          title={props.id}
          footer={props.description}
          after={
            <Toggle
              key={props.id}
              checked={value as boolean}
              onChange={() => {
                Customize.set(selectedThemeName, props.id, !value);
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
