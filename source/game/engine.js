import * as PIXI from 'pixi.js';

import { ENEMY } from './utils/consts';

import { Enemy } from './enemy';
import { Map } from './map';
import { Tower } from './tower';

export class Engine {
  constructor(options) {
    this.app = null;
    this.enemySpawnTime = 6000;
    this.options = options;

    this.setup();
  }

  setup() {
    this.init();
    this.manageEnemies();
    this.manageTowers();
  }

  init() {
    let { background, container, height, width } = this.options;
    this.app = new PIXI.Application(width, height, {
      backgroundColor: background,
      antialias: true
    });

    document.getElementById(container).appendChild(this.app.view);

    this.map = new Map(this.app);
  }

  manageEnemies() {
    this.spawnEnemy();
    setInterval(() => this.spawnEnemy(), this.enemySpawnTime);
  }

  manageTowers() {
    new Tower(this.app);
  }

  spawnEnemy() {
    new Enemy(this.app, this.map.pathValues, ENEMY.weak, this.onEnemyMove);
  }

  onEnemyMove(position) {
    // console.log("on move", position);
  }
}
