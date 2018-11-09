import { ASSETS_PATH, TOWER } from '../game/utils/consts';

export class Tower {
  constructor(app, options = {}, callback) {
    this.app = app;
    this.tower = null;
    this.options = options;
    this.callback = callback;
    this.container = new PIXI.Container();

    this.setup();
  }

  setup() {
    const { startX, startY, strength } = this.options;

    this.app.stage.addChild(this.container);

    this.tower = PIXI.Sprite.fromImage(`${ASSETS_PATH}${TOWER.weak.asset}`);
    this.tower.interactive = true;
    this.tower.buttonMode = true;
    this.tower.anchor.set(0.5);
    this.tower.x = startX;
    this.tower.y = startY;
    this.tower.canBeMoved = true;
    this.tower.strength = strength;
    this.tower.callback = this.callback;

    this.tower
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);

    this.container.addChild(this.tower);
  }

  onDragStart(event) {
    if (this.canBeMoved) {
      this.data = event.data;
      this.dragging = true;
    }
  }

  onDragEnd() {
    this.dragging = false;
    this.data = null;
    this.canBeMoved = false;
    this.interactive = false;
    this.buttonMode = false;

    this.callback(this);
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = Math.round(newPosition.x);
      this.y = Math.round(newPosition.y);
    }
  }
}
