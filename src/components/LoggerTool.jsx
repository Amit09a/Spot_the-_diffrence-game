import { useState } from 'react';

function LoggerTool({ imageUrl, onConfirm, onQuit }) {
  const [clicks, setClicks] = useState([]);
  const [boxes, setBoxes] = useState([]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const updatedClicks = [...clicks, { x, y }];
    setClicks(updatedClicks);

    if (updatedClicks.length === 2) {
      const [start, end] = updatedClicks;
      const box = {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
      };
      setBoxes([...boxes, box]);
      setClicks([]);
    }
  };

  const handleClear = () => {
    setBoxes([]);
    setClicks([]);
  };

  const handleFinish = () => {
    if (boxes.length === 0) {
      alert("Please mark at least one difference before starting the game.");
      return;
    }
    onConfirm(boxes);
  };

  return (
    <div className="logger-wrapper">
      <h2>🖱️ Click top-left and bottom-right to mark each difference</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleClear}>🧹 Clear All</button>{' '}
        <button onClick={handleFinish}>✅ Finish & Start Game</button>{' '}
        <button onClick={onQuit}>🔙 Quit & Go to Home</button>
      </div>

      <div className="image-container" onClick={handleClick}>
        <img src={imageUrl} alt="Logger Target" />
        {boxes.map((box, idx) => (
          <div
            key={idx}
            className="marker"
            style={{
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LoggerTool;
