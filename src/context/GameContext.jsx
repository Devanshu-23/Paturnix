// src/context/gameContext.jsx
import React, { createContext, useReducer } from 'react';
import { getRoundConfig, generateRoundOptions, generateRandomPattern } from '../utils/gameLogic';

// 1. Define the initial state of our game
const initialState = {
  round: 1,
  score: 0,
  gameState: 'menu', // 'menu', 'showing_pattern', 'player_turn', 'checking', 'game_over'
  gridSize: 5,
  options: generateRoundOptions(getRoundConfig(1)), // Options for round 1
  correctPattern: [], // The pattern to be matched
  playerPattern: {}, // The player's current attempt
  selectedShape: null, 
};

// 2. Create the context
export const GameContext = createContext(initialState);

// 3. Create the reducer function to handle state changes
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_NEXT_ROUND': {
      const nextRound = state.round === 1 && state.gameState === 'menu' ? 1 : state.round + 1;
      const config = getRoundConfig(nextRound);
      
      // First, generate the options for the new round
      const options = generateRoundOptions(config);
      
      // Then, generate the pattern with the correct arguments
      const newPattern = generateRandomPattern(nextRound, options, config.gridSize);

      return {
        ...state,
        round: nextRound,
        gameState: 'showing_pattern',
        gridSize: config.gridSize,
        options: generateRoundOptions(config),
        playerPattern: {}, // Clear player's previous attempt
        correctPattern: newPattern, // Set the new pattern for the round
      };
    }
    case 'SELECT_SHAPE': {
      // The payload will be the shape object that was clicked
      return {
        ...state,
        selectedShape: action.payload,
      };
    }
    // TODO: Add more actions like 'PLACE_SHAPE', 'CLEAR_SHAPE', 'CHECK_SOLUTION'
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
