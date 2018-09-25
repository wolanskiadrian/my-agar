import { ASSETS_PATH, TOWER } from "../game/utils/consts";

export class Tower {
  constructor(app, options = {}) {
    this.app = app;
    this.tower = null;
    this.options = options;
    this.container = new PIXI.Container();

    this.setup();
  }

  setup() {
    this.app.stage.addChild(this.container);

    this.tower = PIXI.Sprite.fromImage(`${ASSETS_PATH}${TOWER.weak.asset}`);
    this.tower.x = 200;
    this.tower.y = 200;

    this.container.addChild(this.tower);
  }
}
