// src/App.jsx
import { useEffect } from 'react'; // <-- Import useEffect
import { MainLayout } from './components/layout/MainLayout';
import { OptionsPanel } from './components/game-ui/OptionsPanel';
import { ScoreDisplay } from './components/game-ui/ScoreDisplay';
import { PhaserGame } from './components/PhaserGame'; // <-- Import PhaserGame
import { useGame } from './hooks/useGame';
import { EventBus } from './utils/EventBus'; // <-- Import EventBus

function App() {
  const { gameState, correctPattern, dispatch } = useGame();

  // This effect watches the gameState
  useEffect(() => {
    if (gameState === 'showing_pattern') {
      // When the state changes, emit an event to Phaser
      EventBus.emit('show-pattern', correctPattern);
    }
  }, [gameState, correctPattern]);

  const handleNextRound = () => {
    dispatch({ type: 'START_NEXT_ROUND' });
  };

  return (
    <>
      <div className="bg-violet-800 text-white p-2 flex justify-between items-center">
        <button className="btn btn-sm btn-accent" onClick={handleNextRound}>
          Start / Next Round
        </button>
        {/* You can keep the debug view for now */}
        <div className='text-xs text-left'>
          <strong>DEBUG: Game State is "{gameState}"</strong>
        </div>
      </div>

      <MainLayout>
        {{
          gameArea: (
            <>
              <ScoreDisplay />
              {/* Replace the placeholder with the real Phaser component */}
              <div className="bg-slate-900/50 rounded-lg flex-grow">
                <PhaserGame />
              </div>
            </>
          ),
          optionsPanel: (
            <OptionsPanel />
          )
        }}
      </MainLayout>
    </>
  );
}

export default App;