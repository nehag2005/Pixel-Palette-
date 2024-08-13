// Variable declarations
let gridSizeValue;
let eraserIsActive = false;
let colorPickerIsActive = false;

// Function calls

eraserTool();
colorPicker();
reset();

// Collect slider input

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeLabel = document.getElementById("gridSizeLabel");

gridSizeInput.addEventListener("input", () => {
  gridSizeValue = parseInt(gridSizeInput.value);
  gridSizeLabel.textContent = `Select a grid size (${gridSizeValue}x${gridSizeValue})`;
  createGrid(gridSizeValue);
});

// Close the color picker when clicking outside

// Functions

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
      square.style.backgroundColor = white;
    });
  });
}

// Create color picker tool

function colorPicker() {
  const colorPickerImg = document.getElementById("colorPickerImg");
  const colorPickerDropdown = document.getElementById("colorPickerInput");
  let selection = "black";
  colorPickerDropdown.addEventListener("input", (event) => {
    selection = event.target.value;
    applyHover(selection);
  });

  colorPickerImg.addEventListener("click", () => {
    colorPickerIsActive = !colorPickerIsActive;

    if (colorPickerIsActive) {
      colorPickerImg.style.border = "1px solid black";
      colorPickerImg.style.backgroundColor = "lightgrey";

      colorPickerDropdown.click();
    } else {
      colorPickerImg.style.border = "none";
      colorPickerImg.style.backgroundColor = "";
    }
  });

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
