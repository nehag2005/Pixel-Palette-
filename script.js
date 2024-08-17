// Variable declarations
let gridSizeValue;
let eraserIsActive = false;
let paintBucketIsActive = false;

// Function calls

eraserTool();
colorPicker();
reset();
download();
paintBucket();

// Collect slider input

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeLabel = document.getElementById("gridSizeLabel");

gridSizeInput.addEventListener("input", () => {
  gridSizeValue = parseInt(gridSizeInput.value);
  gridSizeLabel.textContent = `Select a grid size (${gridSizeValue}x${gridSizeValue})`;
  createGrid(gridSizeValue);
});

// Functions

function paintBucket() {
  const paintBucket = document.querySelector(".paintBucket");

  paintBucket.addEventListener("click", () => {
    paintBucketIsActive = !paintBucketIsActive;

    if (paintBucketIsActive) {
      paintBucket.style.border = "1px solid black";
      paintBucket.style.backgroundColor = "lightgrey";
    } else {
      paintBucket.style.border = "none";
      paintBucket.style.backgroundColor = "";
    }
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

// Apply hover effect on grid squares

function applyHover(color) {
  const gridSquare = document.querySelectorAll(".grid-square");

  gridSquare.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = color;
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
  let selection = "black";
  colorPickerInput.addEventListener("input", (event) => {
    selection = event.target.value;
    applyHover(selection);
  });

  colorPickerInput.addEventListener("click", () => {
    colorPickerDropdown.click();
  });

  // Close the color picker when clicking outside

  document.addEventListener("click", (event) => {
    if (
      !colorPickerImg.contains(event.target) &&
      !colorPickerDropdown.contains(event.target)
    ) {
      colorPickerImg.style.border = "none";
      colorPickerImg.style.backgroundColor = "";
      colorPickerIsActive = false;
    }
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
