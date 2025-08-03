// src/components/ModeSelect.jsx
function ModeSelect({ onSelectMode }) {
  return (
    <div className="mode-select">
      <h2>Select Game Mode</h2>
      <button onClick={() => onSelectMode('default')}>
        ▶️ Play with Default Config
      </button>
      <button onClick={() => onSelectMode('custom')}>
        🛠 Create Your Own Config
      </button>
    </div>
  );
}

export default ModeSelect;
