export const MainLayout = ({ children }) => {
    const { gameArea, optionsPanel } = children;

    return (
        <main className="min-h-screen bg-slate-800 text-white p-4 flex flex-col md:flex-row gap-4">
        {/* Left Side: Game Area */}
        <div className="w-full md:w-3/4 flex flex-col gap-4">
            {gameArea}
        </div>

        {/* Right Side: Options Panel */}
        <aside className="w-full md:w-1/4 bg-slate-700 rounded-lg p-4">
            {optionsPanel}
        </aside>
        </main>
    );
};