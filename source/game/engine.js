import * as PIXI from "pixi.js";

import { ENEMY } from "./utils/consts";

import { Enemy } from "./enemy";
import { Map } from "./map";

export class Engine {
  constructor() {
    this.app = null;
    this.enemy = null;
    this.enemySpawnTime = 6000;
    this.option = {
      background: 0x1099bb,
      height: 630,
      width: 1120
    };

    this.setup();
  }

  setup() {
    this.init();
    this.manageEnemies();
  }

  init() {
    let { background, height, width } = this.option;
    this.app = new PIXI.Application(width, height, {
      backgroundColor: background,
      antialias: true
    });

    document.body.appendChild(this.app.view);

    this.map = new Map(this.app);
  }

  manageEnemies() {
    this.spawnEnemy();
    setInterval(() => this.spawnEnemy(), this.enemySpawnTime);
  }

  spawnEnemy() {
    this.enemy = new Enemy(this.app, this.map.pathValues, ENEMY.weak);
  }
}
