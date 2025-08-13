// src/components/ui/Tile.jsx
import { useGame } from '../../hooks/useGame';
import { Shape } from './Shape';

// Add the new 'isClickable' prop
export const Tile = ({ index, shape, isClickable, isClearing }) => {
  const { dispatch } = useGame();

  const handleTileClick = () => {
    // Only dispatch an action if the tile is clickable
    if(!isClickable) return;
    if (isClearing) {
      // If there's a shape on this tile, dispatch the CLEAR_SHAPE action
      if (shape) {
        dispatch({ type: 'CLEAR_SHAPE', payload: { tileIndex: index } });
      }
    } else {
      // Otherwise, do the default action of placing a shape
      dispatch({ type: 'PLACE_SHAPE', payload: { tileIndex: index } });
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Prevents the browser's context menu from appearing
    if (isClickable && shape) { // Only clear if it's clickable and has a shape
        dispatch({ type: 'CLEAR_SHAPE', payload: { tileIndex: index }});
    }
  };

  const buttonClasses = `btn btn-outline btn-secondary w-full h-full p-2 aspect-square ${
    // Add a 'disabled' style if not clickable
    !isClickable ? 'disabled:bg-slate-700/20' : ''
  }`;

  return (
    <button
      onClick={handleTileClick}
      onContextMenu={handleRightClick} 
      className={buttonClasses}
      disabled={!isClickable}
    >
      {shape && (
        <Shape icon={shape.icon} color={shape.colorClass} size="w-full h-full" />
      )}
    </button>
  );
};

