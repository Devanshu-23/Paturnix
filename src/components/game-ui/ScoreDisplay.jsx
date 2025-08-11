// src/components/game-ui/ScoreDisplay.jsx
import { useGame } from '../../hooks/useGame';

export const ScoreDisplay = () => {
  const { round, score } = useGame(); // Get state from the context

  return (
    <div className="bg-slate-700 rounded-lg p-4 flex justify-around text-center">
      <div>
        <div className="text-sm text-slate-400">ROUND</div>
        <div className="text-3xl font-bold">{round}</div>
      </div>
      <div>
        <div className="text-sm text-slate-400">SCORE</div>
        <div className="text-3xl font-bold">{score}</div>
      </div>
    </div>
  );
};