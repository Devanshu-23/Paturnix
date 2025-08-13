// src/components/game-ui/GameBoard.jsx
import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Tile } from '../ui/Tile';

export const GameBoard = ({ isClearing }) => {
  const { gridSize, playerPattern, correctPattern, gameState } = useGame();

  const tiles = Array.from({ length: gridSize * gridSize });
  const gridColsMap = { 5: 'grid-cols-5', 8: 'grid-cols-8', 10: 'grid-cols-10' };

  // Create a map of the correct pattern for easy lookup.
  // This is more efficient than searching the array on every render.
  const correctPatternMap = correctPattern.reduce((map, item) => {
    map[item.position] = item.shape;
    return map;
  }, {});

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className={`grid ${gridColsMap[gridSize] || 'grid-cols-5'} gap-2 w-full max-w-[80vh]`}>
        {tiles.map((_, index) => {
          // Determine which pattern to show based on the game state
          let shapeToDisplay = null;
          if (gameState === 'ready_to_memorize') {
            shapeToDisplay = correctPatternMap[index];
          } else if (gameState === 'player_turn') {
            shapeToDisplay = playerPattern[index];
          }

          return (
            <div key={index} className="w-full aspect-square">
              <Tile
                index={index}
                shape={shapeToDisplay}
                // A tile is only clickable during the player's turn
                isClickable={gameState === 'player_turn'}
                isClearing={isClearing}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};