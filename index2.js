//createColumn() {
// Create a new column element
const column = document.createElement("div");
column.className = "column";
column.style.right = "100px";
column.style.top = "auto";
column.style.bottom = "100px";

// Append the column to the game screen
this.gameScreen.appendChild(column);

// Add the column to the array for later reference
this.columns.push(column);
//}

//moveColumns() {
for (let i = 0; i < this.columns.length; i++) {
  const column = this.columns[i];
  const currentLeft = parseFloat(column.style.left);
  const newLeft = currentLeft - 1.5;
  column.style.left = newLeft + "px";

  // Check if the column is out of the screen, and remove it
  if (newLeft < -column.offsetWidth) {
    this.columns.splice(i, 1);
    this.gameScreen.removeChild(column); // Remove the column from the DOM
    i--;
  }
}
//}
