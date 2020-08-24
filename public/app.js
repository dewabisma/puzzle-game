import PicturePuzzle from './PicturePuzzle.js';
alert(
  'solve the puzzle, then click the heart button to get your extra surprise!'
);

// render
const modalBox = document.getElementsByClassName('modal-box')[0];
const puzzleWrapper = document.querySelector('#puzzle-wrapper');
const heartButton = document.querySelector('#heart');

const puzzle1 = new PicturePuzzle(
  document.querySelector('#puzzle-wrapper'),
  'images/QixiFestivalPuzzle.jpg',
  550,
  5
);

puzzle1.onFinished = () => {
  setTimeout(() => {
    puzzleWrapper.style.display = 'none';
    modalBox.style.display = 'block';
  }, 2000);
};

heartButton.addEventListener('click', (event) => {
  open(`/bonus`, '_self');
});
