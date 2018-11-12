import { ASSETS_PATH, TOWER } from '../game/utils/consts';

export class Tower {
  constructor(app, options = {}, linesValues = [], callback) {
    this.app = app;
    this.tower = null;
    this.options = options;
    this.callback = callback;
    this.container = new PIXI.Container();
    this.linesValues = linesValues;

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

    if (this.tower.colisionDetected) {
      this.container.removeChild(this.tower);
    }

    this.callback(this.tower);
  }

  onDragMove() {
    if (this.tower.dragging) {
      const newPosition = this.tower.data.getLocalPosition(this.tower.parent);
      this.tower.x = Math.round(newPosition.x);
      this.tower.y = Math.round(newPosition.y);

      this.tower.colisionDetected = this.lineRect(
        this.linesValues,
        this.tower.x - 30,
        this.tower.y - 30,
        60,
        60
      );
    }
  }

  // collision detection taken from http://jeffreythompson.org/collision-detection/line-rect.php
  lineRect(lines, rx, ry, rw, rh) {
    let colision = false;

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
        colision = true;
      }
    });

    return colision;
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
}
