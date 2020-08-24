export default class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.isHidden = false;
    this.width = this.puzzle.width / this.puzzle.dimension;
    this.height = this.puzzle.height / this.puzzle.dimension;

    this.el = this.createDiv();
    this.setBackgroundImage();
    puzzle.el.appendChild(this.el);
  }

  createDiv() {
    const div = document.createElement('div');

    if (this.index === this.puzzle.lastIndex) {
      div.classList.add('hide');
      this.isHidden = true;
    }

    div.setAttribute('id', `${this.index}`);
    div.style.position = 'absolute';
    div.style.border = '1px solid #FFF';
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    div.onclick = () => {
      this.findNearbyCell();
      this.puzzle.isAssembled();
    };

    return div;
  }

  setBackgroundImage() {
    const { x, y } = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;

    this.el.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
    this.el.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }

  setPosition(index) {
    const { left, top } = this.setPositionFromIndex(index);

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  setPositionFromIndex(index) {
    const { x, y } = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y,
    };
  }

  findNearbyCell() {
    const currentCellIndex = this.puzzle.findPosition(this.index);
    const hiddenCellIndex = this.puzzle.findHidden();
    const { x, y } = this.getXY(currentCellIndex);
    const { x: hiddenX, y: hiddenY } = this.getXY(hiddenCellIndex);

    if (
      (x === hiddenX || y === hiddenY) &&
      (Math.abs(x - hiddenX) === 1 || Math.abs(y - hiddenY) === 1)
    ) {
      this.puzzle.swapCells(currentCellIndex, hiddenCellIndex);
    }
    console.log(this.puzzle.cells);
  }

  getXY(index) {
    return {
      x: index % this.puzzle.dimension,
      y: Math.floor(index / this.puzzle.dimension),
    };
  }
}
