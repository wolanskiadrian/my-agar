import "normalize.css";
import "./style/style.sass";
import "./style/style.css";

import { Engine } from "./game/engine.js";

new Engine({
  background: 0x1099bb,
  container: "js-game",
  height: 630,
  width: 1120
});
