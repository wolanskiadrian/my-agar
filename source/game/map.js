export class Map {
  constructor(app) {
    this.app = app;
    this.path = null;

    this.setup();
  }

  setup() {
    this.setupBackground();
    this.drawPath();
  }

  setupBackground() {
    const background = PIXI.Sprite.fromImage('../../images/background.jpg');
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    this.app.stage.addChild(background);
  }

  drawPath() {
    this.path = new PIXI.Graphics()
      .lineStyle(2, 0x0000ff, 1)
      .moveTo(0, 87)
      .lineTo(920, 87)
      .lineTo(920, 235)
      .lineTo(295, 235)
      .lineTo(295, 450)
      .lineTo(1033, 450)
      .lineTo(1033, 630);

    this.app.stage.addChild(this.path);
  }

  get pathValues() {
    let values = [];
    const points = this.path.graphicsData[0].shape.points;

    for (let i = 0; i < points.length; i += 2) {
      values.push({
        x: points[i],
        y: points[i + 1]
      });
    }

    return values;
  }

  get linesValues() {
    const values = [];
    const points = this.path.graphicsData[0].shape.points;

    for (let i = 0; i < points.length; i += 2) {
      values.push({
        x1: points[i],
        y1: points[i + 1],
        x2: points[i + 2],
        y2: points[i + 3]
      });
    }

    values.pop();

    return values;
  }
}
