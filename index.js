class Game {
  constructor() {
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.score = 0;
    this.gameIsOver = false;
    this.counter = 0;
    this.animationId = null;

    this.columns = [];

    this.start();
  }

  start() {
    this.gameLoop();
    setInterval(() => this.generateColumn(), 3000);
  }

  gameLoop() {
    if (this.gameIsOver) {
      cancelAnimationFrame(this.animationId); // Stop the animation loop when the game is over
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
    this.update();
  }

  update() {
    // Update game state, check for collisions, etc.

    // Check if it's time to create a new column
    this.counter++;
    if (this.counter % 120 === 0) {
      // Create a new column every 60 frames (1 second at 60 frames per second)
      this.generateColumn();
    }

    this.moveColumns(); // Move existing columns to the left
  }

  generateColumn() {
    const lowerGame = document.getElementById("lowerGame");
    const column = document.createElement("div");
    column.className = "column";
    lowerGame.appendChild(column);
    this.columns.push(column);
  }

  moveColumns() {
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];
      const currentLeft = parseFloat(column.style.left) || 0;
      const newLeft = currentLeft - 1.5;
      column.style.left = newLeft + "px";

      // Check if the column is out of the screen, and remove it
      if (newLeft < -column.offsetWidth) {
        this.columns.splice(i, 1);
        lowerGame.removeChild(column); // Remove the column from the DOM
        i--;
      }
    }
  }
}

//script

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const mainScreen = document.getElementById("game-intro");
const gameContainer = document.getElementById("game-container");
const endScreen = document.getElementById("game-end");
let game = null;

startButton.addEventListener("click", function () {
  startGame();
});

function startGame() {
  console.log("start game");
  gameContainer.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  game = new Game();
  // game.start()
}
