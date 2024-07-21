import { savePositions } from "./cache.js";


export function createCells(){
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
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('drop', drop);
        grid.appendChild(cell);
    }
}


export function loadImages(){
    const image_div = document.getElementById('images');

    for (let i = 1; i < 29; i++) {
        const img = document.createElement('img');
        img.classList.add('draggable');
        img.draggable = true;
        img.src = `images/${i}.png`;
        img.id = i;
        img.addEventListener('dragstart', dragStart);
        img.addEventListener('dragend', dragEnd);
        img.addEventListener('touchstart', touchStart);
        img.addEventListener('touchend', touchEnd);
        image_div.appendChild(img);
    }
}


let draggedItem = null;


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
    savePositions();
}
