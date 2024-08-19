// Variable declarations
let gridSizeValue;
let eraserIsActive = false;
let paintBucketIsActive = false;
let hoverIsActive = true;
let drawingIsActive = false;
let selection = "black";

// Function calls

eraserTool();
colorPicker();
reset();
download();
//paintBucket();
selectModes();

// Collect slider input

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeLabel = document.getElementById("gridSizeLabel");

gridSizeInput.addEventListener("input", () => {
  gridSizeValue = parseInt(gridSizeInput.value);
  gridSizeLabel.textContent = `Select a grid size (${gridSizeValue}x${gridSizeValue})`;
  createGrid(gridSizeValue);
});

// Functions

// Fill colour in the grid

// Create paint bucket tool

/*function paintBucket() {
  const paintBucket = document.querySelector(".paintBucket");

  paintBucket.addEventListener("click", () => {
    paintBucketIsActive = !paintBucketIsActive;

    if (paintBucketIsActive) {
      paintBucket.style.border = "1px solid black";
      paintBucket.style.backgroundColor = "lightgrey";

      floodFill();
    } else {
      paintBucket.style.border = "none";
      paintBucket.style.backgroundColor = "";
    }
  });
}

// Implement Flood Fill Algorithm for the paint bucket tool

function dfs(grid, i, j, oldColor, newColor) {
  const n = grid; // number of rows (i)
  const m = grid; // number of columns (j)
}
function floodFill() {}*/

// Handle hover mode

function handleHover(event) {
  event.target.style.backgroundColor = selection;
}

// Handle click mode

function handleClick(event) {
  event.target.style.backgroundColor = selection;
}

// Apply modes
function applyMode() {
  const gridSquare = document.querySelectorAll(".grid-square");

  gridSquare.forEach((square) => {
    square.removeEventListener("mouseover", handleHover);
    square.removeEventListener("click", handleClick);

    if (hoverIsActive) {
      square.addEventListener("mouseover", handleHover);
    } else {
      square.addEventListener("click", handleClick);
    }
  });
}

// Select modes

function selectModes() {
  const hoverMode = document.querySelector(".hover-mode");
  const drawingMode = document.querySelector(".drawing-mode");

  hoverMode.addEventListener("click", () => {
    hoverIsActive = true;
    drawingIsActive = false;
    hoverMode.style.border = "1px solid black";
    hoverMode.style.backgroundColor = "lightgrey";
    drawingMode.style.backgroundColor = "";
    drawingMode.style.border = "none";
    applyMode();
  });

  drawingMode.addEventListener("click", () => {
    drawingIsActive = true;
    hoverIsActive = false;
    drawingMode.style.border = "1px solid black";
    drawingMode.style.backgroundColor = "lightgrey";
    hoverMode.style.backgroundColor = "";
    hoverMode.style.border = "none";
    applyMode();
  });
}

// Download your art work

function download() {
  const downloadBtn = document.querySelector(".downloadBtn");

  downloadBtn.addEventListener("click", () => {
    const gridContainer = document.querySelector(".grid-container");

    html2canvas(gridContainer, { scale: 15 }).then(function (canvas) {
      const gridImg = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = gridImg;
      downloadLink.download = "sketch.png";

      downloadLink.click();
    });
  });
}

// Create a reset button
function reset() {
  const resetBtn = document.querySelector(".resetBtn");

  resetBtn.addEventListener("click", () => {
    const gridSquare = document.querySelectorAll(".grid-square");
    gridSquare.forEach((square) => {
      square.style.backgroundColor = "white";
    });
  });
}

// Create color picker tool

function colorPicker() {
  const colorPickerInput = document.getElementById("colorPickerInput");
  colorPickerInput.addEventListener("input", (event) => {
    selection = event.target.value;
  });

  colorPickerInput.addEventListener("click", () => {
    colorPickerDropdown.click();
  });
}

// Create eraser tool

function eraserTool() {
  const eraser = document.querySelector(".eraser");

  function erase(event) {
    event.target.style.backgroundColor = "white";
  }

  // Toggle the eraser tool

  eraser.addEventListener("click", () => {
    eraserIsActive = !eraserIsActive;

    if (eraserIsActive) {
      eraser.style.border = "1px solid black";
      eraser.style.backgroundColor = "lightgrey";

      const gridSquare = document.querySelectorAll(".grid-square");
      gridSquare.forEach((square) => {
        square.addEventListener("mouseover", erase);
      });
    } else {
      eraser.style.border = "none";
      eraser.style.backgroundColor = "";

      const gridSquare = document.querySelectorAll(".grid-square");
      gridSquare.forEach((square) => {
        square.removeEventListener("mouseover", erase);
      });
    }
  });
}

// Create a dynamic grid

function createGrid(gridSize) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";

  const gridContainerSize = 600;
  let singleSqSize = gridContainerSize / gridSize;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.className = "grid-square";
    gridSquare.style.width = `${singleSqSize}px`;
    gridSquare.style.height = `${singleSqSize}px`;
    gridContainer.appendChild(gridSquare);
  }
}

// Set default grid size to 16

document.addEventListener("DOMContentLoaded", () => {
  createGrid(16);
});
