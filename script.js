// Variable declarations
let gridSizeValue;
let eraserIsActive = false;
let colorPickerIsActive = false;

// Function calls

eraserTool();
colorPicker();

// Collect slider input

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeLabel = document.getElementById("gridSizeLabel");

gridSizeInput.addEventListener("input", () => {
  gridSizeValue = parseInt(gridSizeInput.value);
  gridSizeLabel.textContent = `Select a grid size (${gridSizeValue}x${gridSizeValue})`;
  createGrid(gridSizeValue);
});

// Functions

// Apply hover effect on grid squares

function applyHover() {
  const gridSquare = document.querySelectorAll(".grid-square");

  gridSquare.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "blue";
    });
  });
}

// Create color picker tool

function colorPicker() {
  const colorPickerImg = document.getElementById("#colorPickerImg");
  const colorPickerDropdown = document.getElementById("#colorPickerInput");

  let color = "black";

  colorPickerImg.addEventListener("click", () => {
    colorPickerDropdown.click();
  });

  colorPickerDropdown.addEventListener("input", (event) => {
    color = event.target.value;
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

  applyHover();
}
