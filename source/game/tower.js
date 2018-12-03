import { ASSETS_PATH, TOWER } from '../game/utils/consts';
import { lineRect, contains } from './utils/collisions';

export class Tower {
  constructor(app, options = {}, linesValues = [], towers = [], callback) {
    this.app = app;
    this.tower = null;
    this.options = options;
    this.callback = callback;
    this.container = new PIXI.Container();
    this.linesValues = linesValues;
    this.towers = towers;

    this.setup();
  }

  setup() {
    const { startX, startY, strength } = this.options;
    const dictionaryTowerKey = Object.keys(TOWER).find(key => {
      return TOWER[key].strength === strength;
    });
    const dictionaryTower = TOWER[dictionaryTowerKey];

    this.app.stage.addChild(this.container);

    this.tower = PIXI.Sprite.fromImage(`${ASSETS_PATH}${dictionaryTower.asset}`);
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
      .on('pointerup', this.onDragEnd, this)
      .on('pointerupoutside', this.onDragEnd, this)
      .on('pointermove', this.onDragMove, this);

    this.container.addChild(this.tower);
  }

  onDragStart(event) {
    if (this.canBeMoved) {
      this.data = event.data;
      this.dragging = true;
    }
  }

  onDragEnd() {
    this.tower.dragging = false;
    this.tower.data = null;
    this.tower.canBeMoved = false;
    this.tower.interactive = false;
    this.tower.buttonMode = false;

    if (this.tower.collisionWithPath || this.tower.collisionWithTowers) {
      this.container.removeChild(this.tower);
    }

    this.callback(this.tower);
  }

  onDragMove() {
    if (this.tower.dragging) {
      const newPosition = this.tower.data.getLocalPosition(this.tower.parent);
      this.tower.x = Math.round(newPosition.x);
      this.tower.y = Math.round(newPosition.y);

      this.tower.collisionWithPath = lineRect(
        this.linesValues,
        this.tower.x - this.tower.width / 2,
        this.tower.y - this.tower.height / 2,
        this.tower.width,
        this.tower.height
      );

      this.tower.collisionWithTowers = this.checkCollisionWithTowers(this.towers);
    }
  }

  checkCollisionWithTowers(existingTowers) {
    let collision = false;

    existingTowers.forEach(towerItem => {
      if (
        contains(
          this.tower.x,
          this.tower.y,
          this.tower.width,
          this.tower.height,
          towerItem.x,
          towerItem.y,
          towerItem.width,
          towerItem.height
        )
      ) {
        collision = true;
      }
    });

    return collision;
  }
}
