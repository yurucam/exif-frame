import { Theme } from './draw';
import noFrame from './01-no-frame';
import cinemaScope from './02-cinema-scope';
import simple from './03-simple';
import darkSimple from './04-dark-simple';
import inside from './05-inside';
import darkInside from './06-dark-inside';
import gridLines from './07-grid-lines';
import monitor from './08-monitor';
import strap from './09-strap';
import darkStrap from './10-dark-strap';
import justFrame from './11-just-frame';
import shotOn from './12-shot-on';
import compact from './13-compact';
import darkCompact from './14-dark-compact';
import polaroid from './15-polaroid';
import insideCompact from './16-inside-compact';
import insideDarkCompact from './17-inside-dark-compact';

const themes: { name: string; func: Theme; preview: string }[] = [
  { name: 'Shot On', func: shotOn, preview: '/preview/shot-on.jpg' },
  { name: 'Monitor', func: monitor, preview: '/preview/monitor.jpg' },
  { name: 'Simple', func: simple, preview: '/preview/simple.jpg' },
  { name: 'Inside', func: inside, preview: '/preview/inside.jpg' },
  { name: 'Strap', func: strap, preview: '/preview/strap.jpg' },
  { name: 'Compact', func: compact, preview: '/preview/compact.jpg' },
  { name: 'Inside Compact', func: insideCompact, preview: '/preview/inside-compact.jpg' },
  { name: 'Dark Simple', func: darkSimple, preview: '/preview/dark-simple.jpg' },
  { name: 'Dark Inside', func: darkInside, preview: '/preview/dark-inside.jpg' },
  { name: 'Dark Strap', func: darkStrap, preview: '/preview/dark-strap.jpg' },
  { name: 'Dark Compact', func: darkCompact, preview: '/preview/dark-compact.jpg' },
  { name: 'Dark Inside Compact', func: insideDarkCompact, preview: '/preview/dark-inside-compact.jpg' },
  { name: 'Just Frame', func: justFrame, preview: '/preview/just-frame.jpg' },
  { name: 'Polaroid', func: polaroid, preview: '/preview/polaroid.jpg' },
  { name: 'Cinema Scope', func: cinemaScope, preview: '/preview/cinema-scope.jpg' },
  { name: 'Grid Lines', func: gridLines, preview: '/preview/grid-lines.jpg' },
  { name: 'No Frame', func: noFrame, preview: '/preview/no-frame.jpg' },
];

export default themes;
