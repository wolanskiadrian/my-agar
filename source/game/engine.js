import * as PIXI from 'pixi.js';

export class Engine {
  constructor(options) {
    this.app = null;
    this.options = options;
    this.setup();
  }

  setup() {
    this.init();
  }

  init() {
    let { background, container, height, width } = this.options;
    this.app = new PIXI.Application(width, height, {
      backgroundColor: background,
      antialias: true
    });

    document.getElementById(container).appendChild(this.app.view);
  }
}
