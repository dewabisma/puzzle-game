import Cell from './Cell.js';

export default class Puzzle {
  constructor(el, imgSrc, width, dimension = 3) {
    this.parentEl = el;
    this.imgSrc = imgSrc;
    this.dimension = dimension;
    this.width = width;
    this.cells = [];
    this.lastIndex = Math.pow(this.dimension, 2) - 1;

    this.onFinished = () => {};

    const img = new Image();
    img.onload = () => {
      this.height = (this.width * img.height) / img.width;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;
      this.setup();
    };
    img.src = this.imgSrc;
    this.el = this.createWrapper();

    this.parentEl.appendChild(this.el);
  }

  createWrapper() {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.margin = '0 auto';
    return div;
  }

  setup() {
    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.cells.push(new Cell(this, i));
      this.cells[i].setPosition(i);
    }
    this.shuffleArray();
    console.log(this.cells);
  }

  shuffleArray() {
    for (let i = 1000; i > 0; i--) {
      const randomArray = this.createRandomCellArray();
      const hiddenCellIndex = this.findHidden();
      const j = Math.floor(Math.random() * randomArray.length);
      const randomlyPickedNearbyIndex = randomArray[j];
      this.swapCells(hiddenCellIndex, randomlyPickedNearbyIndex);
    }
  }

  swapCells(i, j) {
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    this.cells[i].setPosition(i);
    this.cells[j].setPosition(j);
  }

  isAssembled() {
    for (let i = 0; i < this.cells.length; i++) {
      if (i !== this.cells[i].index) {
        return false;
      }
    }
    this.cells[this.findHidden()].el.classList.remove('hide');
    this.onFinished();
    return true;
  }

  findPosition(ind) {
    return this.cells.findIndex((cell) => cell.index === ind);
  }

  findHidden() {
    return this.cells.findIndex((cell) => cell.isHidden);
  }

  checkTopCell(x, y) {
    if (y === 0) return null;
    return this.findHidden() - this.dimension;
  }

  checkBottomCell(x, y) {
    if (y === this.dimension - 1) return null;
    return this.findHidden() + this.dimension;
  }

  checkLeftCell(x, y) {
    if (x === 0) return null;
    return this.findHidden() - 1;
  }

  checkRightCell(x, y) {
    if (x === this.dimension - 1) return null;
    return this.findHidden() + 1;
  }

  createRandomCellArray() {
    const { x, y } = this.hiddenXY();
    return [
      this.checkTopCell(x, y),
      this.checkRightCell(x, y),
      this.checkBottomCell(x, y),
      this.checkLeftCell(x, y),
    ].filter((cell) => cell !== null);
  }

  showModal() {
    alert('called');
    document.querySelector('.modal-box').style.display = 'block';
  }

  hiddenXY() {
    const index = this.findHidden();
    return {
      x: index % this.dimension,
      y: Math.floor(index / this.dimension),
    };
  }
}
