# 🔍 Spot the Difference Game (ReactJS)

A fun and interactive **Spot the Difference** game built using **ReactJS**. Players must find differences between two images either loaded from a **default configuration** (`config.json`) or uploaded manually via the **custom configuration screen**.

---

## 📦 Features

- Play with a predefined config (image + difference coordinates).
- Upload your own images and mark differences using a built-in Logger Tool.
- Timer tracks how long you take to find all differences.
- Simple interface with reset and quit options.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/spot-the-difference.git
cd spot-the-difference

2. Install dependencies

npm install

3. Run the game
npm run dev

🧠 How the JSON Configuration Works
The game uses a configuration JSON to load:

Game title

Image URLs (or base64 for local uploads)

Coordinates of all differences (as bounding boxes)

{
  "gameTitle": "Spot the Difference - Jungle",
  "images": {
    "image1": "assets/image1.jpg",
    "image2": "assets/image2.jpg"
  },
  "differences": [
    { "x": 536, "y": 251, "width": 10, "height": 11 },
    { "x": 671, "y": 143, "width": 40, "height": 40 },
    { "x": 691, "y": 672, "width": 30, "height": 30 },
    { "x": 612, "y": 355, "width": 20, "height": 20 }
  ]
}
🛠️ In Custom Mode:
1.) Users upload two images (left and right).

2.) The Logger Tool helps mark all differences.

3.) These difference regions are saved in the same format as the JSON above and used to start the game.

