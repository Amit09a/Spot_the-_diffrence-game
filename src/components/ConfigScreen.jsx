import { useState } from 'react';

function ConfigScreen({ onConfigReady }) {
  const [gameTitle, setGameTitle] = useState('Custom Game');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image1 || !image2) {
      alert('Please upload both images');
      return;
    }

    const config = {
      gameTitle,
      images: {
        image1,
        image2,
      },
      differences: [] // Empty initially
    };

    // ✅ Ensure mode is custom and config is passed up
    onConfigReady(config); // Parent App component will now use useEffect correctly
  };

  return (
    <div className="config-screen">
      <h2>🛠️ Configure Your Game</h2>
      <form onSubmit={handleSubmit}>
        <label>Game Title:</label>
        <input
          type="text"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />

        <label>Upload Left Image (image1):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage1)}
        />

        <label>Upload Right Image (image2):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage2)}
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Start Game</button>
      </form>

      {image1 && image2 && (
        <div className="image-pair" style={{ marginTop: '1rem' }}>
          <div className="image-container">
            <img src={image1} alt="Preview Left" />
          </div>
          <div className="image-container">
            <img src={image2} alt="Preview Right" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigScreen;
