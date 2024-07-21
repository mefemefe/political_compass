export function loadPositions() {
    const positions = JSON.parse(localStorage.getItem('imagePositions'));
    if (positions) {
        for (const [id, cellIndex] of Object.entries(positions)) {
            const img = document.getElementById(id);
            const cell = document.querySelector(`.cell[data-index='${cellIndex}']`);
            if (img && cell) {
                cell.appendChild(img);
            }
        }
    }
}

export function savePositions() {
    const positions = {};
    const images = document.querySelectorAll('.draggable'); 
    images.forEach(img => {
        const parentCell = img.parentElement;
        if (parentCell && parentCell.classList.contains('cell')) {
            positions[img.id] = parentCell.dataset.index;
        }
    });
    localStorage.setItem('imagePositions', JSON.stringify(positions));
}
