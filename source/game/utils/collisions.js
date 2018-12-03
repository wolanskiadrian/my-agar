// collision detection taken from http://jeffreythompson.org/collision-detection/line-rect.php
export function lineRect(lines, rx, ry, rw, rh) {
  let collision = false;

  lines.forEach(line => {
    const left = lineLine(line.x1, line.y1, line.x2, line.y2, rx, ry, rx, ry + rh);
    const right = lineLine(line.x1, line.y1, line.x2, line.y2, rx + rw, ry, rx + rw, ry + rh);
    const top = lineLine(line.x1, line.y1, line.x2, line.y2, rx, ry, rx + rw, ry);
    const bottom = lineLine(line.x1, line.y1, line.x2, line.y2, rx, ry + rh, rx + rw, ry + rh);

    if (left || right || top || bottom) {
      collision = true;
    }
  });

  return collision;
}

export function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  // calculate the direction of the lines
  const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

// collision detection taken from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export function contains(x1, y1, w1, h1, x2, y2, w2, h2) {
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
