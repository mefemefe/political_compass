import { loadPositions } from "./cache.js";
import { createCells, loadImages } from "./grid.js";


document.addEventListener('DOMContentLoaded', () => {
    createCells();
    loadImages();
    loadPositions();
});
