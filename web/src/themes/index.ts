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

const themes: { name: string; func: Theme }[] = [
  { name: 'No Frame', func: noFrame },
  { name: 'Cinema Scope', func: cinemaScope },
  { name: 'Simple', func: simple },
  { name: 'Dark Simple', func: darkSimple },
  { name: 'Inside', func: inside },
  { name: 'Dark Inside', func: darkInside },
  { name: 'Grid Lines', func: gridLines },
  { name: 'Monitor', func: monitor },
  { name: 'Strap', func: strap },
  { name: 'Dark Strap', func: darkStrap },
];

export default themes;
