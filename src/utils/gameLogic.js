// src/utils/gameLogic.js
import { SHAPE_DEFINITIONS, COLOR_DEFINITIONS } from '../constants/gameShapes';

/**
 * Determines the game configuration based on the current round number.
 * @param {number} round - The current round number.
 * @returns {object} An object with gridSize, numShapes, and numColors.
 */
export const getRoundConfig = (round) => {
  let gridSize, numShapes, numColors;

  // Determine Grid Size
  if (round >= 1 && round <= 20) gridSize = 5;
  else if (round >= 21 && round <= 60) gridSize = 8;
  else if (round >= 61 && round <= 100) gridSize = 10;
  else gridSize = 10; // Default for rounds > 100

  // Determine Shape and Color count for the Options Panel
  if (round >= 1 && round <= 10) { numShapes = 1; numColors = 2; }
  else if (round >= 11 && round <= 20) { numShapes = 2; numColors = 2; }
  else if (round >= 21 && round <= 35) { numShapes = 2; numColors = 3; }
  else if (round >= 36 && round <= 50) { numShapes = 3; numColors = 3; }
  else if (round >= 51 && round <= 75) { numShapes = 3; numColors = 4; }
  else if (round >= 76 && round <= 100) { numShapes = 4; numColors = 4; }
//   else { numShapes = 4; numColors = 4; } // Default

  return { gridSize, numShapes, numColors };
};

/**
 * Generates the list of available shape-color options for a given round configuration.
 * @param {object} config - The configuration from getRoundConfig.
 * @returns {array} The array of available shape objects for the options panel.
 */
export const generateRoundOptions = ({ numShapes, numColors }) => {
  const availableShapes = SHAPE_DEFINITIONS.slice(0, numShapes);
  const availableColors = COLOR_DEFINITIONS.slice(0, numColors);

  // Programmatically generate the combinations from the available sets
  return availableShapes.flatMap(shape => 
    availableColors.map(color => ({
      id: `${shape.id}-${color.id}`,
      name: `${color.name} ${shape.name}`,
      icon: shape.icon,
      colorClass: color.tailwindClass,
      shapeId: shape.id,
      colorId: color.id,
    }))
  );
};


/**
 * Generates the random pattern of shapes and positions for a given round.
 * @param {number} round - The current round number (determines how many shapes to place).
 * @param {array} options - The array of available shapes for this round.
 * @param {number} gridSize - The size of the grid (e.g., 5 for a 5x5 grid).
 * @returns {array} An array of pattern items, e.g., [{ position, shape }].
 */
export const generateRandomPattern = (round, options, gridSize) => {
  const newPattern = [];
  const totalTiles = gridSize * gridSize;

  // Create an array of all possible tile indices, e.g., [0, 1, 2, ..., 24] for a 5x5 grid
  const availablePositions = Array.from(Array(totalTiles).keys());

  // A simple way to shuffle the available positions
  availablePositions.sort(() => 0.5 - Math.random());

  for (let i = 0; i < round; i++) {
    // Ensure we don't try to place more shapes than there are tiles
    if (availablePositions.length === 0) break;

    // Pick a random shape from the available options
    const randomShape = options[Math.floor(Math.random() * options.length)];

    // Take the next unique random position from our shuffled list
    const randomPosition = availablePositions.pop();

    newPattern.push({
      position: randomPosition,
      shape: randomShape,
    });
  }

  return newPattern;
};