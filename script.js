// Create a dynamic grid

function createGrid(gridSize) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";

  const gridContainerSize = 600;
  let singleSqSize = gridContainerSize / gridSize;

  for (let i = 0; i < gridSize; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.className = "grid-square";
    gridSquare.style.width = `${singleSqSize}px`;
    gridSquare.style.height = `${singleSqSize}px`;
    gridContainer.appendChild(gridSquare);
  }
}

// Declarations

let gridSizeValue;

// Get user input for grid size

const gridSizeBtn = document.getElementById("gridBtn");
const gridInput = document.getElementById("gridSize");
gridSizeBtn.addEventListener("click", () => {
  gridSizeValue = parseInt(gridInput.value);
  gridInput.value = "";
});

createGrid(gridSizeValue);
