import 'normalize.css';
import './style/style.scss';

import Popup from './ui-components/popup.js';
const popupHandlers = document.querySelectorAll('[data-open-popup]');
[...popupHandlers].map(item => Popup.attach(item));
