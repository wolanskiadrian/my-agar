import { TweenMax, Linear } from "gsap";

import { ASSETS_PATH, ENEMY } from "../game/utils/consts";

export class Enemy {
  constructor(app, path, options) {
    this.app = app;
    this.enemy = null;
    this.path = path;
    this.options = options;
    this.container = new PIXI.Container();

    this.setup();
  }

  setup() {
    let { speed } = this.options;
    this.app.stage.addChild(this.container);

    this.enemy = PIXI.Sprite.fromImage(`${ASSETS_PATH}${ENEMY.weak.asset}`);
    this.enemy.position.copy(this.path[0]);
    this.enemy.anchor.set(0.5);
    this.enemy.pivot.set(0.5);
    this.enemy.scale.set(0.5);

    this.container.addChild(this.enemy);

    TweenMax.to(this.enemy, speed, {
      bezier: {
        values: this.path,
        curviness: 0
      },
      repeat: 0,
      yoyo: true,
      ease: Power0.easeNone
    });
  }
}
