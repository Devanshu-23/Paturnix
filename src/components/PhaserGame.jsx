// src/components/PhaserGame.jsx
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene'; 
import { useGame } from '../hooks/useGame';

export const PhaserGame = () => {
  const { gridSize } = useGame();
  const phaserGameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      backgroundColor: '#2d2d2d',
      scale: {
        width: '100%',
        height: '100%',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [MainScene],
    };

    phaserGameRef.current = new Phaser.Game(config);

    // Pass initial data to the scene
    phaserGameRef.current.scene.start('MainScene', { gridSize });

    return () => {
      phaserGameRef.current.destroy(true);
    };
  }, [gridSize]); // Rerun effect if gridSize changes

  return <div id="phaser-container" className="w-full h-full" />;
};