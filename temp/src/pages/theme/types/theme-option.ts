type StringOption = {
  type: 'string';
  default: string;
};

type NumberOption = {
  type: 'number';
  default: number;
};

type BooleanOption = {
  type: 'boolean';
  default: boolean;
};

type SelectOption = {
  type: 'select';
  default: string;
  options: string[];
};

type RangeSliderOption = {
  type: 'range-slider';
  default: number;
  min: number;
  max: number;
  step: number;
};

type ColorOption = {
  type: 'color';
  default: string;
};

type ThemeOption = (StringOption | NumberOption | BooleanOption | SelectOption | RangeSliderOption | ColorOption) & {
  id: string;
  description?: string;
};

type ThemeOptionInput = Map<string, string | number | boolean>;

const getConverter = (type: string): typeof String | typeof Number | typeof Boolean => {
  switch (type) {
    case 'string':
    case 'select':
    case 'color':
      return String;

    case 'number':
    case 'range-slider':
      return Number;

    case 'boolean':
      return Boolean;

    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export { getConverter };
export type { ThemeOption, ThemeOptionInput };
