function createCells(){
    const grid = document.getElementById('grid');

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (i < 50) {
            if (i % 10 < 5) {
                cell.classList.add('quadrant-1');
            } else {
                cell.classList.add('quadrant-2');
            }
        } else {
            if (i % 10 < 5) {
                cell.classList.add('quadrant-3');
            } else {
                cell.classList.add('quadrant-4');
            }
        }
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
}


function loadImages(){
    const image_div = document.getElementById('images');
    for (let i = 1; i < 29; i++) {
        const img = document.createElement('img');
        img.classList.add('draggable');
        img.draggable = true;
        img.src = `images/${i}.png`;
        img.id = i;
        image_div.appendChild(img);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createCells();
    loadImages();

    const images = document.querySelectorAll('.draggable');

    images.forEach(img => {
        img.addEventListener('dragstart', dragStart);
        img.addEventListener('dragend', dragEnd);
        img.addEventListener('touchstart', touchStart);
        img.addEventListener('touchend', touchEnd);
    });

    const cells = document.querySelectorAll('#grid div');

    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('drop', drop);
    });

    let draggedItem = null;
    loadPositions();


    function savePositions() {
        const positions = {};
        images.forEach(img => {
            const parentCell = img.parentElement;
            if (parentCell && parentCell.classList.contains('cell')) {
                positions[img.id] = parentCell.dataset.index;
            }
        });
        localStorage.setItem('imagePositions', JSON.stringify(positions));
    }
    
    function loadPositions() {
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

    function dragStart(event) {
        draggedItem = event.target;
        setTimeout(() => {
            event.target.style.display = 'none';
        }, 0);
    }
    
    function dragEnd(event) {
        setTimeout(() => {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        if (event.target.tagName === 'DIV' && draggedItem) {
            event.target.appendChild(draggedItem);
            draggedItem.style.position = event.target.style.position;
            draggedItem.style.left = event.target.style.left;
            draggedItem.style.top = event.target.style.top;
            savePositions();
        }
    }

    function touchStart(event) {
        event.preventDefault();
        draggedItem = event.touches[0].target;
    }

    function touchEnd(event) {
        let touch = event.changedTouches[0];
        let cell = document.elementFromPoint(touch.clientX, touch.clientY);
        if (cell && cell.classList.contains('cell') && draggedItem) {
            cell.appendChild(draggedItem);
        }
        draggedItem = null;
    }

});
