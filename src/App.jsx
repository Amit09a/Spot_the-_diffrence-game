import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import ConfigScreen from './components/ConfigScreen';
import ModeSelect from './components/ModeSelect';
import LoggerTool from './components/LoggerTool';
import './index.css';

function App() {
  const [mode, setMode] = useState(null); // 'default' or 'custom'
  const [config, setConfig] = useState(null);
  const [showLogger, setShowLogger] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  // Load default config
  useEffect(() => {
    if (mode === 'default') {
      fetch('/config.json')
        .then(res => res.json())
        .then(data => {
          setConfig(data);
          setHasGameStarted(true);
        })
        .catch(err => console.error('Error loading config:', err));
    }
  }, [mode]);

  // Show logger if in custom mode and no differences yet
  useEffect(() => {
    if (
      mode === 'custom' &&
      config?.images?.image1 &&
      config?.images?.image2 &&
      !config.differences?.length
    ) {
      setShowLogger(true);
    }
  }, [config, mode]);

  // After user confirms the differences from LoggerTool
  const handleDifferencesConfirmed = (differences) => {
    setConfig((prev) => ({
      ...prev,
      differences,
    }));
    setShowLogger(false);
    setHasGameStarted(true);
  };

  // Quit the game and reset everything
  const handleQuitGame = () => {
    setConfig(null);
    setMode(null);
    setShowLogger(false);
    setHasGameStarted(false);
  };

  // Mode select screen
  if (!mode) return <ModeSelect onSelectMode={setMode} />;

  // Custom config setup
  if (mode === 'custom' && !config)
    return <ConfigScreen onConfigReady={setConfig} />;

  // Fallback loading
  if (!config) return <p>Loading...</p>;

  // Logger screen
  if (showLogger) {
    return (
      <div className="app">
        <h1>🧪 Logger Tool</h1>
        <LoggerTool
          imageUrl={config.images.image2}
          onConfirm={handleDifferencesConfirmed}
          onQuit={handleQuitGame}
        />
      </div>
    );
  }

  // Final gameplay screen
  if (hasGameStarted || mode === 'default') {
    return (
      <div className="app">
        <h1>{config.gameTitle}</h1>
        <GameBoard
          image1={config.images.image1}
          image2={config.images.image2}
          differences={config.differences}
        />
        <button onClick={handleQuitGame} style={{ marginTop: '1.5rem' }}>
          🔙 Quit & Go to Home
        </button>
      </div>
    );
  }

  return null;
}

export default App;
