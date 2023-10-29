document.addEventListener('DOMContentLoaded', () => {
    const gridSizeRange = document.getElementById('gridSizeRange');
    const gridContainer = document.getElementById('gridContainer');
    const colorPicker = document.getElementById('colorPicker');
    const eraserButton = document.getElementById('eraser');

    let isDrawing = false;
    let selectedColor = colorPicker.value;

    colorPicker.addEventListener('input', () => {
        selectedColor = colorPicker.value;
        
    });

    eraserButton.addEventListener('click', () => {
        selectedColor = getComputedStyle(gridContainer).getPropertyValue('background-color');
        colorPicker.value = rgbToHex(selectedColor);
    });

    gridSizeRange.addEventListener('input', () => {
        const gridSize = gridSizeRange.value;
        gridContainer.innerHTML = ''; // Clear the existing grid

        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gridContainer.appendChild(cell);
        }
    });

    gridContainer.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    gridContainer.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    gridContainer.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    gridContainer.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const cell = e.target;
            if (cell.classList.contains('cell')) {
                cell.style.backgroundColor = selectedColor;
            }
        }
    });

    gridContainer.addEventListener('click', (e) => {
        const cell = e.target;
        if (cell.classList.contains('cell')) {
            cell.style.backgroundColor = selectedColor;
        }
    });

    function rgbToHex(rgb) {
        // Extract the RGB values from the computed style
        const rgbValues = rgb.match(/\d+/g);
        if (rgbValues) {
            const hex = "#" + rgbValues.map((v) => parseInt(v).toString(16).padStart(2, '0')).join('');
            return hex;
        }
        return null;
    }
    


});