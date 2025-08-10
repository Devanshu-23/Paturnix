// src/App.jsx
import { MainLayout } from './components/layout/MainLayout';
import { OptionsPanel } from './components/game-ui/OptionsPanel';
import { ScoreDisplay } from './components/game-ui/ScoreDisplay';

function App() {
  return (
    <MainLayout>
      {{
        // This object corresponds to the 'children' prop in MainLayout
        gameArea: (
          <>
            <ScoreDisplay />
            {/* This is where the Phaser canvas will live */}
            <div className="bg-slate-900/50 rounded-lg flex-grow flex justify-center items-center">
              <p className="text-2xl text-slate-500">Game Canvas Area</p>
            </div>
          </>
        ),
        optionsPanel: (
          <OptionsPanel />
        )
      }}
    </MainLayout>
  );
}

export default App;