// src/App.jsx
import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { OptionsPanel } from './components/game-ui/OptionsPanel';
import { ScoreDisplay } from './components/game-ui/ScoreDisplay';
import { GameBoard } from './components/game-ui/GameBoard';
import { useGame } from './hooks/useGame';

function App() {
  const { gameState } = useGame(); // We only need gameState for the banner now

  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (gameState !== 'player_turn') {
      setIsClearing(false);
    }
  }, [gameState]);

  return (
    <>
      <div className="bg-violet-800 text-white p-2 flex justify-center items-center min-h-[56px]">
        <div className='text-xl font-bold text-left'>
          {/* Show a clear message based on the game state */}
          {gameState === 'round_won' && <span className="text-green-400">Correct!</span>}
          {gameState === 'game_over' && <span className="text-red-400">Game Over</span>}
          {gameState === 'player_turn' && <span>Your Turn</span>}
          {gameState === 'ready_to_memorize' && <span>Memorize the Pattern</span>}
        </div>
      </div>

      <MainLayout>
        {{
          gameArea: (
            <>
              <ScoreDisplay />
              <div className="bg-slate-900/50 rounded-lg flex-grow">
                <GameBoard isClearing={isClearing} />
              </div>
            </>
          ),
          optionsPanel: (
            <OptionsPanel isClearing={isClearing} setIsClearing={setIsClearing} />
          )
        }}
      </MainLayout>
    </>
  );
}

export default App;