import { useEffect, useState } from 'react';

function GameBoard({ image1, image2, differences }) {
  const [found, setFound] = useState([]);
  const [completed, setCompleted] = useState(false);

  // Handle user click
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    for (let i = 0; i < differences.length; i++) {
      const d = differences[i];
      const alreadyFound = found.some(
        (f) => f.x === d.x && f.y === d.y && f.width === d.width && f.height === d.height
      );
      if (alreadyFound) continue;

      const withinX = x >= d.x && x <= d.x + d.width;
      const withinY = y >= d.y && y <= d.y + d.height;

      if (withinX && withinY) {
        setFound((prev) => [...prev, d]);
        break;
      }
    }
  };

  // Check if game is completed
  useEffect(() => {
    if (found.length === differences.length) {
      setCompleted(true);
    }
  }, [found, differences]);

  // Restart the game
  const handleRestart = () => {
    setFound([]);
    setCompleted(false);
  };

  // Render found markers
  const renderMarkers = () =>
    found.map((box, idx) => (
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
    ));

  return (
    <div className="game-wrapper">
      <h2>Click the differences on the right image!</h2>
      <p>
        Found: {found.length} / {differences.length}
      </p>

      <div className="image-pair">
        {/* Left Image */}
        <div className="image-container">
          <img src={image1} alt="Left" />
        </div>

        {/* Right Image */}
        <div className="image-container" onClick={handleClick}>
          <img src={image2} alt="Right" />
          {renderMarkers()}
        </div>
      </div>

      {completed && (
        <>
          <h3 className="success">🎉 You found all the differences!</h3>
          <button onClick={handleRestart}>🔄 Restart Game</button>
        </>
      )}
    </div>
  );
}

export default GameBoard;
