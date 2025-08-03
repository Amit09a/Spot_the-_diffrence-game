import { useEffect, useState } from 'react';

function GameBoard({ image1, image2, differences }) {
  const [found, setFound] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState(0); // ⏱️ Track time in seconds

  useEffect(() => {
    let timer;
    if (!completed) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [completed]);

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

  useEffect(() => {
    if (found.length === differences.length) {
      setCompleted(true);
    }
  }, [found, differences]);

  const renderMarkers = () =>
    found.map((box, idx) => (
      <div
        key={idx}
        className="marker"
        style={{
          left: box.x,
          top: box.y,
          width: box.width,
          height: box.height
        }}
      ></div>
    ));

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="game-wrapper">
      <h2>Click the differences on the right image!</h2>
      <p>Found: {found.length} / {differences.length}</p>
      <p>⏱️ Time: {formatTime(time)}</p>

      <div className="image-pair">
        <div className="image-container">
          <img src={image1} alt="Left" />
        </div>

        <div className="image-container" onClick={handleClick}>
          <img src={image2} alt="Right" />
          {renderMarkers()}
        </div>
      </div>

      {completed && (
        <h3 className="success">
          🎉 You found all differences in {formatTime(time)}!
        </h3>
      )}
    </div>
  );
}

export default GameBoard;
