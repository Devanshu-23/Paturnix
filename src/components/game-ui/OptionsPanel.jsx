// src/components/game-ui/OptionsPanel.jsx
import { Shape } from '../ui/Shape';
import { useGame } from '../../hooks/useGame';
import { getRoundConfig } from '../../utils/gameLogic';

export const OptionsPanel = ({ isClearing, setIsClearing }) => {
  const { options, selectedShape, round, gameState, dispatch } = useGame();

  const handleShapeClick = (shape) => {
    // Only allow shape selection during the player's turn
    if (gameState === 'player_turn') {
      dispatch({ type: 'SELECT_SHAPE', payload: shape });
    }
  };

  const { numColors } = getRoundConfig(round);
  const gridColsMap = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };

  // Determine the action button based on the game state
  let actionButton;
  
  switch (gameState) {
    case 'menu':
      actionButton = (
        <button className="btn btn-accent btn-lg w-full" onClick={() => dispatch({ type: 'START_NEXT_ROUND' })}>
          Start Game
        </button>
      );
      break;
    case 'ready_to_memorize':
      actionButton = (
        <button className="btn btn-success btn-lg w-full" onClick={() => dispatch({ type: 'START_PLAYER_TURN' })}>
          Play
        </button>
      );
      break;
    case 'player_turn':
      actionButton = (
        <button className="btn btn-primary btn-lg w-full" onClick={() => dispatch({ type: 'CHECK_SOLUTION' })}>
          Submit
        </button>
      );
      break;
    case 'round_won':
      actionButton = (
        <button className="btn btn-accent btn-lg w-full" onClick={() => dispatch({ type: 'START_NEXT_ROUND' })}>
          Next
        </button>
      );
      break;
    case 'game_over':
       actionButton = (
        <button className="btn btn-error btn-lg w-full" onClick={() => dispatch({ type: 'RESTART_GAME' })}>
          Play Again
        </button>
      );
      break;
    default:
      actionButton = null; // No button for other states
  }

  return (
    <div className="flex-between flex-col gap-4 h-full">
        <h2 className="text-2xl font-bold text-center border-b border-slate-500 pb-2 w-full">Options</h2>

        <div className={`grid ${gridColsMap[numColors]} gap-4 md:gap-2 lg:gap-4 w-full`}>
            {options.map((shape) => (
                <div key={shape.id} className="min-w-0 w-full aspect-square">
                <button
                    className={`btn btn-outline p-2 w-full h-full flex items-center justify-center ${
                    selectedShape?.id === shape.id ? 'btn-active' : ''
                    }`}
                    onClick={() => handleShapeClick(shape)}
                    disabled={gameState !== 'player_turn'}
                >
                    <Shape
                    icon={shape.icon}
                    color={shape.colorClass}
                    size="w-full h-full"
                    />
                </button>
                </div>
            ))}
            </div>


      {/* <div className="flex-grow flex flex-col justify-center items-center bg-slate-800/50 rounded-lg mt-2">
        <h3 className="text-sm text-slate-400">SELECTED</h3>
        <p className="text-lg font-bold">
          {selectedShape ? selectedShape.name : 'None'}
        </p>
      </div> */}

      <div className="flex-center w-full flex-col gap-4">
        {/* The Clear button is only visible during the player's turn */}
        <div className="w-full flex-between gap-2">
          {gameState === 'player_turn' && (
            <button
              className={`btn btn-warning flex-grow  ${isClearing ? 'btn-active' : ''}`}
              onClick={() => setIsClearing(!isClearing)}
            >
              Clear
            </button>
          )}
          {gameState === 'player_turn' && (
            <button
              className={`btn btn-warning flex-grow`}
            >
              Check
            </button>
          )}
        </div>
        {actionButton}
      </div>

    </div>
  );
};

