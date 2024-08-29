// Variable declarations
let gridArr = [];
let gridSizeValue;
let eraserIsActive = false;
let paintBucketIsActive = false;
let hoverIsActive = false;
let drawingIsActive = false;
let selection = "#56386b";
let previousMode = null;
let modeSelected = false;

// Function calls

eraserTool();
colorPicker();
reset();
download();
paintBucket();
selectModes();
applyMode();

// Collect slider input

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeLabel = document.getElementById("gridSizeLabel");

gridSizeInput.addEventListener("input", () => {
  gridSizeValue = parseInt(gridSizeInput.value);
  gridSizeLabel.textContent = `Select a grid size (${gridSizeValue}x${gridSizeValue})`;
  createGrid(gridSizeValue);
});

// Functions

// Create paint bucket tool

function paintBucket() {
  const paintBucket = document.querySelector(".paintBucket");

  paintBucket.addEventListener("click", () => {
    if (!modeSelected) return;
    paintBucketIsActive = !paintBucketIsActive;

    if (paintBucketIsActive) {
      previousMode = { hoverIsActive, drawingIsActive };

      paintBucket.classList.add("active-tool");

      // Deactivate eraser tool
      eraserIsActive = false;
      const eraser = document.querySelector(".eraser");
      eraser.classList.remove("active-tool");

      const gridSquare = document.querySelectorAll(".grid-square");
      gridSquare.forEach((square) => {
        square.removeEventListener("mouseover", erase);
      });

      drawingIsActive = false;
      hoverIsActive = false;
    } else {
      paintBucket.classList.remove("active-tool");

      if (previousMode) {
        hoverIsActive = previousMode.hoverIsActive;
        drawingIsActive = previousMode.drawingIsActive;
      }
    }

    applyMode();
  });
}

// Implement Flood Fill Algorithm for the paint bucket tool

// Recursive Function
function dfs(i, j, oldColor, newColor) {
  const n = gridArr.length; // number of rows (i)
  const m = gridArr[0].length; // number of columns (j)

  // Base Cases
  if (
    i < 0 ||
    i >= n ||
    j < 0 ||
    j >= m ||
    gridArr[i][j].style.backgroundColor !== oldColor
  ) {
    return;
  } else {
    gridArr[i][j].style.backgroundColor = newColor;
    dfs(i - 1, j, oldColor, newColor); // Up
    dfs(i + 1, j, oldColor, newColor); // Down
    dfs(i, j - 1, oldColor, newColor); // Left
    dfs(i, j + 1, oldColor, newColor); // Right
  }
}

// Non-Recursive
function floodFill(i, j, newColor) {
  let oldColor = gridArr[i][j].style.backgroundColor;

  if (oldColor === newColor) {
    return;
  }
  dfs(i, j, oldColor, newColor);
}

// Handle hover mode

function handleHover(event) {
  event.target.style.backgroundColor = selection;
}

// Handle click mode

function applyColor(event) {
  if (paintBucketIsActive) {
    const i = event.target.dataset.row;
    const j = event.target.dataset.col;
    floodFill(parseInt(i), parseInt(j), selection);
  } else if (drawingIsActive) {
    event.target.style.backgroundColor = selection;
  }
}

// Apply modes
function applyMode() {
  const gridSquare = document.querySelectorAll(".grid-square");

  // Remove all event listeners to reset the state
  gridSquare.forEach((square) => {
    square.removeEventListener("click", applyColor);
    square.removeEventListener("mouseover", handleHover);
    square.removeEventListener("mouseover", erase);
    square.removeEventListener("mouseover", applyColor);
    square.removeEventListener("mousedown", applyColor);
  });

  if (paintBucketIsActive) {
    gridSquare.forEach((square) => {
      square.addEventListener("click", applyColor);
    });
  } else if (hoverIsActive) {
    gridSquare.forEach((square) => {
      square.addEventListener("mouseover", handleHover);
    });
  } else if (drawingIsActive) {
    // Click and Drag Mode
    gridSquare.forEach((square) => {
      square.addEventListener("click", applyColor);
    });

    window.addEventListener("mousedown", () => {
      gridSquare.forEach((square) => {
        square.addEventListener("mouseover", applyColor);
      });
    });

    window.addEventListener("mouseup", () => {
      gridSquare.forEach((square) => {
        square.removeEventListener("mouseover", applyColor);
      });
    });
  }
}

// Select modes

function selectModes() {
  const hoverMode = document.querySelector(".hover-mode");
  const drawingMode = document.querySelector(".drawing-mode");
  const eraser = document.querySelector(".eraser");
  const paintBucket = document.querySelector(".paintBucket");

  hoverMode.addEventListener("click", () => {
    // Deactivate other tools
    paintBucketIsActive = false;
    eraserIsActive = false;
    paintBucket.classList.remove("active-tool");
    eraser.classList.remove("active-tool");

    hoverIsActive = true;
    drawingIsActive = false;
    hoverMode.classList.add("active-tool");
    drawingMode.classList.remove("active-tool");
    applyMode();
    modeSelected = true;
  });

  drawingMode.addEventListener("click", () => {
    // Deactivate other tools
    paintBucketIsActive = false;
    eraserIsActive = false;
    paintBucket.classList.remove("active-tool");
    eraser.classList.remove("active-tool");

    drawingIsActive = true;
    hoverIsActive = false;
    hoverMode.classList.remove("active-tool");
    drawingMode.classList.add("active-tool");
    applyMode();
    modeSelected = true;
  });
}

// Download your art work

function download() {
  const downloadBtn = document.querySelector(".downloadBtn");

  downloadBtn.addEventListener("click", () => {
    if (!modeSelected) return;
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
    if (!modeSelected) return;
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
    if (!modeSelected) return;
    selection = event.target.value;
  });
}

// Create eraser tool
function erase(event) {
  event.target.style.backgroundColor = "white";
}

function eraserTool() {
  const eraser = document.querySelector(".eraser");

  // Toggle the eraser tool

  eraser.addEventListener("click", () => {
    if (!modeSelected) return;
    eraserIsActive = !eraserIsActive;

    if (eraserIsActive) {
      eraser.classList.add("active-tool");

      // Deactivate paint tool
      paintBucketIsActive = false;
      const paintBucket = document.querySelector(".paintBucket");
      paintBucket.classList.remove("active-tool");
      paintBucket.removeEventListener("click", applyColor);

      const gridSquare = document.querySelectorAll(".grid-square");
      gridSquare.forEach((square) => {
        square.addEventListener("mouseover", erase);
      });
    } else {
      eraser.classList.remove("active-tool");

      const gridSquare = document.querySelectorAll(".grid-square");
      gridSquare.forEach((square) => {
        square.removeEventListener("mouseover", erase);
      });

      applyMode();
    }
  });
}

// Create a dynamic grid

function createGrid(gridSize) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";

  gridArr = [];

  const gridContainerSize = 600;
  let singleSqSize = gridContainerSize / gridSize;

  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
      const gridSquare = document.createElement("div");
      gridSquare.className = "grid-square";
      gridSquare.style.width = `${singleSqSize}px`;
      gridSquare.style.height = `${singleSqSize}px`;

      // Record grid square coordinates
      gridSquare.dataset.row = i;
      gridSquare.dataset.col = j;

      gridContainer.appendChild(gridSquare);
      row.push(gridSquare);
    }
    gridArr.push(row);
  }
}

// Set default grid size to 16

document.addEventListener("DOMContentLoaded", () => {
  createGrid(16);
});
