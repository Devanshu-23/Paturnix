// src/game/scenes/MainScene.js
import Phaser from 'phaser';
import { EventBus } from '../../utils/EventBus';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.gridSize = 0;
  }

  init(data) {
    this.gridSize = data.gridSize;
  }

  create() {

    const { width, height } = this.scale;

    const availableSize = Math.min(width, height) * 0.9;

    const tileSize = availableSize / this.gridSize;

    const gridDimension = tileSize * this.gridSize;


    this.add.grid(
      width / 2,       // Center X
      height / 2,      // Center Y
      gridDimension,   // The calculated total width of the grid
      gridDimension,   // The calculated total height of the grid
      tileSize,        // The calculated width of a single cell
      tileSize,        // The calculated height of a single cell
      0x444444,
    );

    // The communication listener 
    EventBus.on('show-pattern', (pattern) => {
      console.log('Phaser received pattern:', pattern);
      // TODO: Add animation logic here.
    });
  }
}