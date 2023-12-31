// import tower from "./images/castle-img-vf.data.js";

class Game {
  constructor() {
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.lowerGame = document.getElementById("lowerGame");
    this.scoreElement = document.getElementById("score");

    this.imgElement = document.createElement("img");
    this.bodyElement = this.imgElement.querySelector(".body");
    this.wingsUnderBellyElement =
      this.imgElement.querySelector(".wings-underBelly");
    this.rayuresLumiereElement =
      this.imgElement.querySelector(".rayures-lumiere");
    this.ombresElement = this.imgElement.querySelector(".ombres");

    this.dragon = new Dragon();
    this.gameIsOver = false;

    this.counter = 0;
    this.score = 0;

    this.animationId = null;

    this.towerCounter = 0;
    this.obstacles = [];

    this.canBeHit = true;
    this.pressedKeys = {
      space: false,
    };
    this.dragon.currentColor = "blueVersion";
    this.start();
    this.dragon.updateDragon();
  }

  start() {
    setTimeout(() => {
      this.gameLoop();
    }, 2750);
    this.dragon.updateDragon("blueVersion");
  }

  gameLoop() {
    if (this.gameIsOver) {
      cancelAnimationFrame(this.animationId); // It stops the animation loop when the game is over
      this.dragon.element.style.display = "none";
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
    this.update();
    //console.log(this.obstacles);
  }

  update() {
    if (this.counter % 96 === 0) {
      this.obstacles.push(new Obstacle(this.lowerGame, this.towerCounter));
      this.towerCounter++;
      this.counter = 0;
    }
    this.counter++;
    for (const obstacle of this.obstacles) {
      //   if (this.obstacles.length >= 2) {
      //     console.log(obstacle);
      //debugger;
      //   }
      obstacle.move();
      obstacle.updatePosition();
      if (this.isColliding(obstacle) && this.canBeHit) {
        //debugger;
        /*console.log("Collide");
        console.log(obstacle.colorClass, this.dragon.currentColor); */
        if (obstacle.colorClass !== this.dragon.currentColor) {
          this.gameIsOver = true;
          console.log("game over");
          gameIsOver();
        } else {
          this.incrementScore();
          roofSound();
          this.canBeHit = false;
          setTimeout(() => {
            this.canBeHit = true;
          }, 1200);
        }
      }
    }
  }

  isColliding(tower) {
    const towerBounding = tower.element.getBoundingClientRect();
    const dragonBounding = this.dragon.element.getBoundingClientRect();

    const isInX =
      towerBounding.right - 20 > dragonBounding.left + 75 &&
      towerBounding.left + 20 < dragonBounding.right - 75;
    const isInY = towerBounding.top + 100 < dragonBounding.bottom; //> = good
    console.log(isInY);
    if (isInY && isInX) {
      console.log(dragonBounding, towerBounding);
    }
    return isInX && isInY;
  }

  /* createDragon() {
    const dragon = new Dragon();
    this.gameContainer.appendChild(dragon.dragonBox);
  } */

  incrementScore() {
    this.score++;
    this.scoreElement.innerText = this.score;
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
    this.colorClass = "";
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

    this.colorClass = colorVersions[randomNum];

    this.updateRoof(this.colorClass);
    /* if (colorClass) {
        // Assign the color class to the tower elements
        rightRoofElement.setAttribute("class", `rightRoof ${colorClass}`);
        leftRoofElement.setAttribute("class", `leftRoof ${colorClass}`);
      } */
    // switch (colorClass) {
    //   case "redVersion":
    //     this.updateRoof("redVersion");
    //     break;
    //   case "blueVersion":
    //     this.updateRoof("blueVersion");
    //     break;
    //   case "yellowVersion":
    //     this.updateRoof("yellowVersion");
    //     break;
    //   case "greenVersion":
    //     this.updateRoof("greenVersion");
    //     break;
    // }

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
    this.left -= 7.5;
    //console.log(this.left);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}

class Dragon {
  constructor() {
    this.dragonBox = document.getElementById("dragonBox");

    // this.imgElement = document.createElement("img");
    // image attributes
    // this.imgElement.src = "./images/dragon-colors/test-dragon.svg";
    // this.imgElement.alt = "Dragon Image";
    // this.imgElement.className = "dragon";
    // this.dragonBox.appendChild(this.imgElement);
    // elements inside the dragon image
    /* this.dragon = {
      body: document.querySelector("svg.dragon #body"),
      wingsUnderBellyElement: document.querySelector(
        "svg.dragon .wings-underBelly"
      ),
    }; */
    this.element = document.querySelector("svg.dragon");
    this.dragon = {
      bodyElement: document.querySelector("svg.dragon #body"),
      //console.log(this.bodyElement);
      wingsUnderBellyElement: document.querySelector(
        "svg.dragon #wings-underBelly"
      ),
      rayuresLumiereElement: document.querySelector(
        "svg.dragon #rayures-lumiere"
      ),
      ombresElement: document.querySelector("svg.dragon #ombres"),
    };

    /* this.bodyElement = document.querySelector("svg.dragon #body");
    //console.log(this.bodyElement);
    this.wingsUnderBellyElement = document.querySelector(
      "svg.dragon #wings-underBelly"
    );
    this.rayuresLumiereElement = document.querySelector(
      "svg.dragon #rayures-lumiere"
    );
    this.ombresElement = document.querySelector("svg.dragon #ombres"); */
    this.currentColor = "blueVersion";
    this.colorVersions = [
      "redVersion",
      "greenVersion",
      "blueVersion",
      "yellowVersion",
      "greenVersion",
    ];
    this.counter = 0;
  }

  changeColor() {
    this.clearColorClasses();
    this.changeColorDragon();
    this.updateDragon();
  }

  changeColorDragon() {
    console.log("change");

    this.currentColor =
      this.colorVersions[this.counter % this.colorVersions.length];
    this.counter++;
    // console.log(currentColor);
    this.updateDragon(this.currentColor);
    // switch (currentColor) {
    //   case "redVersion":
    //     this.updateDragon("redVersion");
    //     break;
    //   case "blueVersion":
    //     this.updateDragon("blueVersion");
    //     break;
    //   case "yellowVersion":
    //     this.updateDragon("yellowVersion");
    //     break;
    //   case "greenVersion":
    //     this.updateDragon("greenVersion");
    //     break;
    // }
  }

  updateDragon(version) {
    this.dragon.bodyElement.classList.add("bodyColor", version);
    //console.log(version);
    this.dragon.wingsUnderBellyElement.classList.add(
      "wingsUnderBellyColor",
      version
    );
    this.dragon.ombresElement.classList.add("ombresColor", version);
    this.dragon.rayuresLumiereElement.classList.add("rayuresColor", version);
  }

  clearColorClasses() {
    const allClasses = [
      "bodyColor",
      "wingsUnderBellyColor",
      "rayuresColor",
      "ombresColor",
      ...this.colorVersions,
    ];

    // i do that to remove all color classes from dragon elements
    this.dragon.bodyElement.classList.remove(...allClasses);
    this.dragon.wingsUnderBellyElement.classList.remove(...allClasses);
    this.dragon.rayuresLumiereElement.classList.remove(...allClasses);
    this.dragon.ombresElement.classList.remove(...allClasses);
  }

  Collide(obstacle) {
    const dragonBounding = this.imgElement.getBoundingClientRect();
    const towerBounding = obstacle.element.getBoundingClientRect();

    const isInX =
      obsBounding.right > carBounding.left &&
      obsBounding.left < carBounding.right;
    const isInY =
      obsBounding.bottom > carBounding.top &&
      obsBounding.top < carBounding.bottom;
    // console.log(isInX, isInY)
    return isInX && isInY;
  }
}

//***************** S C R I P T *********************

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const mainScreen = document.getElementById("game-intro");
const gameContainer = document.getElementById("game-container");
const endScreen = document.getElementById("game-end");
const emptyContainer = document.getElementById("empty");

const finalScore = document.querySelector(".final-score");
const record = document.querySelector(".best-score");
let bestScore = 0;
const bestScoreMessage = "New Record!";

let game = null;
let colorsCounter = 0;

const soundGameContainer = document.getElementById(
  "sound-effect-game-container"
);
const soundHighScore = document.getElementById("sound-effect-high-score");
const soundLowScore = document.getElementById("sound-effect-low-score");
const soundRoof = document.getElementById("sound-effect-roof");

//*********EVENT LISTENER */
startButton.addEventListener("click", function () {
  startGame();
});
restartButton.addEventListener("click", function () {
  restartGame();
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    game.dragon.changeColor();
  }
});

//***********GENERAL FUNCTIONS */

function startGame() {
  console.log("start game");
  gameContainer.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  soundGameplay();
  game = new Game();
  // game.start()

  setTimeout(() => {
    if (emptyContainer) {
      emptyContainer.style.transition = "font-size 0.2s ease-in-out";
      emptyContainer.style.fontSize = "0px";
    }
  }, 2700);
}

function gameIsOver() {
  endScreen.classList.remove("hidden");
  finalScore.innerHTML = game.score;
  compet();
  soundGameContainer.pause();
  console.log(game.score);
}

function compet() {
  if (game.score < bestScore) {
    record.innerHTML = "Best Score : " + bestScore;
    lowScoreSound();
  } else if (game.score === bestScore) {
    lowScoreSound();
  } else if (game.score > bestScore) {
    bestScore = game.score;
    record.innerHTML = bestScoreMessage;
    HighScoreSound();
  }
}

function restartGame() {
  while (game.obstacles.length > 0) {
    const obstacle = game.obstacles.pop();
    game.lowerGame.removeChild(obstacle.element);
  }

  game.score = -1;
  game.counter = 0;
  game.towerCounter = 0;
  game.canBeHit = true;
  game.pressedKeys.space = false;
  emptyContainer.style.fontSize = "18px";

  endScreen.classList.add("hidden");

  function animate() {
    game.gameIsOver = false;
    game.dragon.element.style.cssText -= "display : none";
  }

  game.dragon.clearColorClasses(); // Start a new game
  animate(); // Restart the game animation loop
  game.incrementScore();
  soundHighScore.pause;
  soundLowScore.pause;
  startGame();
}

//***********SOUNDS*** */

function soundGameplay() {
  soundGameContainer.currentTime = 0;
  soundGameContainer.play();
  soundGameContainer.volume = 0.7;
}
function lowScoreSound() {
  soundLowScore.currentTime = 0;
  soundLowScore.play();
}
function HighScoreSound() {
  soundHighScore.currentTime = 0;
  soundHighScore.play();
}
function roofSound() {
  soundRoof.currentTime = 0;
  soundRoof.play();
  soundRoof.volume = 0.5;
}
