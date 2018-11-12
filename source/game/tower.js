import { ASSETS_PATH, TOWER } from '../game/utils/consts';

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

      this.tower.collisionWithPath = this.lineRect(
        this.linesValues,
        this.tower.x - this.tower.width / 2,
        this.tower.y - this.tower.height / 2,
        this.tower.width,
        this.tower.height
      );

      this.tower.collisionWithTowers = this.checkCollisionWithTowers(
        this.towers
      );
    }
  }

  // collision detection taken from http://jeffreythompson.org/collision-detection/line-rect.php
  lineRect(lines, rx, ry, rw, rh) {
    let collision = false;

    lines.forEach(line => {
      const left = this.lineLine(
        line.x1,
        line.y1,
        line.x2,
        line.y2,
        rx,
        ry,
        rx,
        ry + rh
      );
      const right = this.lineLine(
        line.x1,
        line.y1,
        line.x2,
        line.y2,
        rx + rw,
        ry,
        rx + rw,
        ry + rh
      );
      const top = this.lineLine(
        line.x1,
        line.y1,
        line.x2,
        line.y2,
        rx,
        ry,
        rx + rw,
        ry
      );
      const bottom = this.lineLine(
        line.x1,
        line.y1,
        line.x2,
        line.y2,
        rx,
        ry + rh,
        rx + rw,
        ry + rh
      );

      if (left || right || top || bottom) {
        collision = true;
      }
    });

    return collision;
  }

  lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the direction of the lines
    const uA =
      ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB =
      ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }

  checkCollisionWithTowers(existingTowers) {
    let collision = false;

    existingTowers.forEach(towerItem => {
      if (
        this.contains(
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

  // collision detection taken from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  contains(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (
      x1 - w1 / 2 < x2 - w2 / 2 + w2 &&
      x1 - w1 / 2 + w1 > x2 - w2 / 2 &&
      y1 - h1 / 2 < y2 - h2 / 2 + h2 &&
      y1 - h1 / 2 + h1 > y2 - h2 / 2
    ) {
      return true;
    }

    return false;
  }
}
