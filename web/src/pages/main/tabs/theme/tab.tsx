import { Navbar } from 'konsta/react';
import { useThemeStore } from '../../state/theme.store';

export const ThemeTab = () => {
  const { svg, setSvg } = useThemeStore();

  return (
    <>
      <Navbar title="Theme" />

      <div className="p-4">
        <textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          placeholder="Paste or edit SVG here"
          wrap="off"
          className="w-full h-[60vh] block resize-vertical p-3 font-mono text-xs overflow-x-auto rounded-lg border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
        />
      </div>
    </>
  );
};
