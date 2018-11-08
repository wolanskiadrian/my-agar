import 'normalize.css';
import './style/style.scss';

import { Engine } from './game/engine.js';

new Engine({
  background: 0x1099bb,
  container: 'js-game',
  height: 630,
  width: 1120
});