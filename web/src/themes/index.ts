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

const themes: { name: string; func: Theme }[] = [
  { name: 'Shot On', func: shotOn },
  { name: 'Monitor', func: monitor },
  { name: 'Simple', func: simple },
  { name: 'Inside', func: inside },
  { name: 'Strap', func: strap },
  { name: 'Compact', func: compact },
  { name: 'Inside Compact', func: insideCompact },
  { name: 'Dark Simple', func: darkSimple },
  { name: 'Dark Inside', func: darkInside },
  { name: 'Dark Strap', func: darkStrap },
  { name: 'Dark Compact', func: darkCompact },
  { name: 'Inside Dark Compact', func: insideDarkCompact },
  { name: 'Just Frame', func: justFrame },
  { name: 'Polaroid', func: polaroid },
  { name: 'Cinema Scope', func: cinemaScope },
  { name: 'Grid Lines', func: gridLines },
  { name: 'No Frame', func: noFrame },
];

export default themes;
