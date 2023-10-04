//moveColumns() {
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
//}

/* colorChangeTower() {
  for (Obstacle of obstacles) {
    const romdomNum = Math.floor(Math.random() * 4) + 1;

    const towerElement = document.getElementsByName("tower");

    if (romdomNum === 1) {
      tower.rightRoof.replace("#BF522B", "#DD3737"); //red version
      tower.leftRoof.replace("#BF522B", "#EE8C18");
    } else if (romdomNum === 2) {
      tower.rightRoof.replace("#BF522B", "#18A1EE"); //blue version
      tower.leftRoof.replace("#BF522B", "#37BFDD");
    } else if (romdomNum === 3) {
      tower.rightRoof.replace("#BF522B", "#C3A713"); //yellow version
      tower.leftRoof.replace("#BF522B", "#EBE436");
    } else if (romdomNum === 4) {
      tower.rightRoof.replace("#BF522B", "#87A655"); //green version
      tower.leftRoof.replace("#BF522B", "#B3BF45");
    }
  }
} */
