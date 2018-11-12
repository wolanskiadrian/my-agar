export const ASSETS_PATH = '/images/';

export const ENEMY = {
  weak: {
    asset: 'bug.png',
    speed: 10,
    durability: 100,
    resistance: 0
  },
  easy: {
    asset: 'bug.png',
    speed: 15,
    durability: 100,
    resistance: 1
  },
  medium: {
    asset: 'bug.png',
    speed: 16,
    durability: 100,
    resistance: 2
  },
  intermediate: {
    asset: 'bug.png',
    speed: 17,
    durability: 100,
    resistance: 3
  },
  hard: {
    asset: 'bug.png',
    speed: 17,
    durability: 100,
    resistance: 3
  }
};

export const TOWER = {
  weak: {
    asset: 'tower.jpg',
    strength: 1,
    cost: 3,
    startX: 40,
    startY: 200,
    width: 60,
    height: 60
  },
  medium: {
    asset: 'tower.jpg',
    strength: 2,
    cost: 5,
    startX: 40,
    startY: 270,
    width: 60,
    height: 60
  },
  strong: {
    asset: 'tower.jpg',
    strength: 3,
    cost: 10,
    startX: 40,
    startY: 340,
    width: 60,
    height: 60
  }
};
