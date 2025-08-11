// src/components/game-ui/OptionsPanel.jsx
import React from 'react';
// We don't need to import the icons here anymore!
import { Shape } from '../ui/Shape';
// Import our auto-generated list of shapes
import { GAME_SHAPES } from '../../constants/gameShapes';

export const OptionsPanel = () => {
  return (
    <div className="flex-between flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold text-center border-b border-slate-500 pb-2">Options</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* We now map over the imported, auto-generated constant */}
        {GAME_SHAPES.map((shape) => (
          <button
            key={shape.id}
            className="btn btn-outline btn-secondary aspect-square flex-center h-full flex-grow"
          >
            {/* The props now use the new property names from our generator */}
            <Shape icon={shape.icon} color={shape.colorClass} size="w-full h-full" />
          </button>
        ))}
      </div>

      {/* <div className="flex-grow"></div> */}

      <button className="btn btn-primary btn-lg w-full">
        Check
      </button>
    </div>
  );
};