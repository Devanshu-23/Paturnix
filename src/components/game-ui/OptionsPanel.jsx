// src/components/game-ui/OptionsPanel.jsx
import { Shape } from '../ui/Shape';
import { useGame } from '../../hooks/useGame';
import { getRoundConfig } from '../../utils/gameLogic';

export const OptionsPanel = () => {
    const { options, selectedShape, round, dispatch } = useGame();

    
    const { numColors } = getRoundConfig(round);
    
    const gridColsMap = {
        // 1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    };
    
    const handleShapeClick = (shape) => {
        dispatch({ type: 'SELECT_SHAPE', payload: shape });
    };

  return (
    <div className="flex-between flex-col gap-4 h-full">
        <h2 className="text-2xl font-bold text-center border-b border-slate-500 pb-2">Options</h2>

        <div className={`grid ${gridColsMap[numColors]} gap-4 md:gap-2 lg:gap-4 w-full`}>
            {options.map((shape) => (
                <div key={shape.id} className="min-w-0 w-full aspect-square">
                <button
                    className={`btn btn-outline p-2 w-full h-full flex items-center justify-center ${
                    selectedShape?.id === shape.id ? 'btn-active' : ''
                    }`}
                    onClick={() => handleShapeClick(shape)}
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

      <button className="btn btn-primary btn-lg w-full">
        Check
      </button>
    </div>
  );
};

