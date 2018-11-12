import * as PIXI from 'pixi.js';

import { ENEMY, TOWER } from './utils/consts';

import { Enemy } from './enemy';
import { Map } from './map';
import { Tower } from './tower';

export class Engine {
  constructor(options) {
    this.app = null;
    this.enemySpawnTime = 6000;
    this.options = options;
    this.towers = [];

    this.setup();
  }

  setup() {
    this.init();
    this.initTowers();
    this.manageEnemies();
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

  initTowers() {
    // 3 Base towers on side
    this.placeBaseTower(1);
    this.placeBaseTower(2);
    this.placeBaseTower(3);
  }

  onTowerPlaced(tower) {
    if (!tower.collisionWithPath && !tower.collisionWithTowers) {
      this.towers = [...this.towers, tower];
    }

    this.placeBaseTower(tower.strength);
  }

  placeBaseTower(towerStrength) {
    switch (towerStrength) {
      case 1:
        new Tower(
          this.app,
          TOWER.weak,
          this.map.linesValues,
          this.towers,
          this.onTowerPlaced.bind(this)
        );
        break;
      case 2:
        new Tower(
          this.app,
          TOWER.medium,
          this.map.linesValues,
          this.towers,
          this.onTowerPlaced.bind(this)
        );
        break;
      case 3:
        new Tower(
          this.app,
          TOWER.strong,
          this.map.linesValues,
          this.towers,
          this.onTowerPlaced.bind(this)
        );
        break;
      default:
        return;
    }
  }

  manageEnemies() {
    this.spawnEnemy();
    setInterval(() => this.spawnEnemy(), this.enemySpawnTime);
  }

  spawnEnemy() {
    new Enemy(this.app, this.map.pathValues, ENEMY.weak, this.onEnemyMove);
  }

  onEnemyMove(position) {
    // console.log('on move', position);
  }
}
