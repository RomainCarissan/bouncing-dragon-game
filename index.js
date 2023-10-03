// import tower from "./images/castle-img-vf.data.js";

class Game {
  constructor() {
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.lowerGame = document.getElementById("lowerGame");
    this.score = 0;
    this.gameIsOver = false;
    this.counter = 0;
    this.animationId = null;
    this.towerCounter = 1;
    this.obstacles = [];

    this.start();
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      cancelAnimationFrame(this.animationId); // Stop the animation loop when the game is over
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
    this.update();
    //console.log(this.obstacles);
  }

  update() {
    if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.lowerGame, this.towerCounter));
      this.towerCounter++;
      this.counter = 0;
    }
    this.counter++;
    for (const obstacle of this.obstacles) {
      //   if (this.obstacles.length >= 2) {
      //     console.log(obstacle);
      //     debugger;
      //   }
      obstacle.move();
      obstacle.updatePosition();
    }
  }
}

//obstacle-colomns
class Obstacle {
  constructor(lowerGame, number) {
    const gameContainer = document.getElementById("game-container");
    const endScreen = document.getElementById("game-end");
    this.lowerGame = lowerGame;

    this.width = 100;
    this.height = 300;

    const lowergameWidth = this.lowerGame.getBoundingClientRect().width;
    //console.log(lowergameWidth);
    this.left = parseInt(lowergameWidth) + this.width;
    // this.element.classList.add("tower");
    // this.element = document.createElement("div");
    // this.element.style.width = `${this.width}px`;
    // this.element.style.height = `${this.height}px`;
    // this.element.style.position = "absolute";
    const template = document.getElementById("tower-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector("svg").id = `tower-${number}`;
    this.lowerGame.append(clone);
    this.element = this.lowerGame.querySelector(`#tower-${number}`);
    this.element.style.left = `${this.left}px`;
    this.colorChangeTower();
  }

  colorChangeTower() {
    const colorVersions = {
      1: "redVersion",
      2: "blueVersion",
      3: "yellowVersion",
      4: "greenVersion",
    };

    this.rightRoofElement = this.element.querySelector(".rightRoof");
    this.leftRoofElement = this.element.querySelector(".leftRoof");

    const randomNum = Math.floor(Math.random() * 4) + 1;

    const colorClass = colorVersions[randomNum];

    /* if (colorClass) {
        // Assign the color class to the tower elements
        rightRoofElement.setAttribute("class", `rightRoof ${colorClass}`);
        leftRoofElement.setAttribute("class", `leftRoof ${colorClass}`);
      } */
    switch (colorClass) {
      case "redVersion":
        this.updateRoof("redVersion");
        break;
      case "blueVersion":
        this.updateRoof("blueVersion");
        break;
      case "yellowVersion":
        this.updateRoof("yellowVersion");
        break;
      case "greenVersion":
        this.updateRoof("greenVersion");
        break;
    }

    // if (randomNum === 1) {
    //   // Replace existing classes with the red version
    //   tower.classList.add("red");
    //   rightRoofElement.setAttribute("class", "rightRoof redVersion");
    //   leftRoofElement.setAttribute("class", "leftRoof redVersion");
    // } else if (randomNum === 2) {
    //   // Replace existing classes with the blue version
    //   tower.classList.add("blue");
    //   rightRoofElement.setAttribute("class", "rightRoof blueVersion");
    //   leftRoofElement.setAttribute("class", "leftRoof blueVersion");
    // } else if (randomNum === 3) {
    //   // Replace existing classes with the yellow version
    //   tower.classList.add("yellow");
    //   rightRoofElement.setAttribute("class", "rightRoof yellowVersion");
    //   leftRoofElement.setAttribute("class", "leftRoof yellowVersion");
    // } else if (randomNum === 4) {
    //   // Replace existing classes with the green version
    //   tower.classList.add("green");
    //   rightRoofElement.setAttribute("class", "rightRoof greenVersion");
    //   leftRoofElement.setAttribute("class", "leftRoof greenVersion");
    // }

    // return this.element.innerHTML;
  }

  updateRoof(version) {
    this.rightRoofElement.classList.add("rightRoof", version);
    this.leftRoofElement.classList.add("leftRoof", version);
  }

  move() {
    this.left -= 2;
    console.log(this.left);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}

class Dragon {
  constructor() {
    const gameContainer = document.getElementById("game-container");
    const endScreen = document.getElementById("game-end");
    this.dragonBox = dragonBox;
    this.player = document.createElement("svg");
    this.player = this.dragonBox;
  }

  changeColorDragon() {
    const colorVersions = {
      1: "redVersion",
      2: "blueVersion",
      3: "yellowVersion",
      4: "greenVersion",
    };
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
