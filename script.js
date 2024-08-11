// Variable declarations
let gridSizeValue;

// Get user input for grid size

const gridSizeBtn = document.getElementById("gridBtn");
const gridInput = document.getElementById("gridSize");
gridSizeBtn.addEventListener("click", () => {
  gridSizeValue = parseInt(gridInput.value);
  const isValid = validateUserInput(gridSizeValue);
  if (isValid) {
    createGrid(gridSizeValue);
  }
  gridInput.value = "";
});

// Apply hover effect on grid squares

function applyHover() {
  const gridSquare = document.querySelectorAll(".grid-square");

  gridSquare.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "blue";
    });

    square.addEventListener("mouseout", () => {
      square.style.backgroundColor = "white";
    });
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

// Validate user input
function validateUserInput(gridSize) {
  // Remove previous warning
  const prevWarningMsg = document.querySelector(".grid-warning");
  if (prevWarningMsg) {
    prevWarningMsg.remove();
  }

  // Create warning message
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    gridWarningMsg = document.createElement("p");
    gridWarningMsg.textContent =
      "Invalid size. Please enter a grid size between 1 and 100 inclusively.";
    gridWarningMsg.className = "grid-warning";
    document.querySelector(".gridInput").appendChild(gridWarningMsg);
    return false;
  }
  return true;
}
