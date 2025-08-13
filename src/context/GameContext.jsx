// src/context/gameContext.jsx
import React, { createContext, useReducer } from 'react';
import { getRoundConfig, generateRoundOptions, generateRandomPattern } from '../utils/gameLogic';

// 1. Define the initial state of our game
const createInitialState = () => ({
  round: 1,
  score: 0,
  gameState: 'menu', // 'menu', 'ready_to_memorize', 'player_turn', 'round_won', 'game_over'
  gridSize: 5,
  options: generateRoundOptions(getRoundConfig(1)),
  correctPattern: [],
  playerPattern: {},
  selectedShape: null,
});

const initialState = createInitialState();

// 2. Create the context
export const GameContext = createContext(initialState);

// 3. Create the reducer function to handle state changes
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_NEXT_ROUND': {
      const round = state.round === 1 && state.gameState === 'menu' ? 1 : state.round + 1;
      const config = getRoundConfig(round);
      const options = generateRoundOptions(config);
      const newPattern = generateRandomPattern(round, options, config.gridSize);

      return {
        ...state,
        round: round,
        gameState: 'ready_to_memorize', 
        gridSize: config.gridSize,
        options: options,
        playerPattern: {},
        correctPattern: newPattern,
      };
    }
    
    // This action is dispatched when the player is ready to start placing tiles
    case 'START_PLAYER_TURN': {
      return {
        ...state,
        gameState: 'player_turn',
      };
    }

    case 'PLACE_SHAPE': {
      const { tileIndex } = action.payload;
      if (state.selectedShape && !state.playerPattern[tileIndex]) {
        return {
          ...state,
          playerPattern: {
            ...state.playerPattern,
            [tileIndex]: state.selectedShape,
          },
          // selectedShape: null,
        };
      }
      return state;
    }

    case 'CLEAR_SHAPE': {
        const { tileIndex } = action.payload;
        // Create a new copy of the player pattern
        const newPlayerPattern = { ...state.playerPattern };
        // Delete the property for the given tile index
        delete newPlayerPattern[tileIndex];
        return {
            ...state,
            playerPattern: newPlayerPattern,
        };
    }

    // The core logic for checking the player's answer
    case 'CHECK_SOLUTION': {
      if (state.gameState !== 'player_turn') return state; // Only check if it's the player's turn

      // 1. Convert the correct pattern array to a map for easier lookup
      const correctMap = state.correctPattern.reduce((map, item) => {
        map[item.position] = item.shape.id;
        return map;
      }, {});

      // 2. Check if the number of placed tiles is correct
      if (Object.keys(state.playerPattern).length !== state.correctPattern.length) {
        return { ...state, gameState: 'game_over' }; // Incorrect
      }
      
      // 3. Check if every placed tile is correct
      for (const tileIndex in state.playerPattern) {
        if (correctMap[tileIndex] !== state.playerPattern[tileIndex].id) {
          return { ...state, gameState: 'game_over' }; // Incorrect
        }
      }

      // 4. If we get here, the pattern is correct!
      return {
        ...state,
        gameState: 'round_won',
        score: state.score + (state.round * 10), // Add score based on round
      };
    }
    
    // Action to restart the game from the beginning
    case 'RESTART_GAME': {
        return createInitialState();
    }

    case 'SELECT_SHAPE': {
      return { ...state, selectedShape: action.payload };
    }
    default:
      return state;
  }
}

// 4. Create the GameProvider component to wrap our app
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
