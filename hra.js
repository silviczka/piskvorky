// import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';
// import { findWinner } from './findWinner';
import { myFindWinner } from './myFindWinner.js';

let currentPlayer = 'circle';
const playBoard = document.querySelectorAll('.cell');
const boardState = new Array(10).fill().map(() => new Array(10).fill('_'));

//shows info which player is active
const toggleCurrentPlayer = () => {
  const activePlayerImg = document.querySelector('.active-player img');
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    activePlayerImg.src = 'podklady/cross.svg';
    activePlayerImg.alt = 'cross-img';
  } else {
    currentPlayer = 'circle';
    activePlayerImg.src = 'podklady/circle.svg';
    activePlayerImg.alt = 'circle-img';
  }
};

//assignes correct sign to the clicked cell according to active player
const placeSign = (event) => {
  const clickedCell = event.target;
  if (currentPlayer === 'circle') {
    clickedCell.classList.remove('cell--empty');
    clickedCell.classList.add('board__field--circle');
  } else if (currentPlayer === 'cross') {
    clickedCell.classList.remove('cell--empty');
    clickedCell.classList.add('board__field--cross');
  }
  clickedCell.disabled = true;
};

//check for winner
const checkForWin = () => {
  playBoard.forEach((cell, index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    if (cell.classList.contains('cell--empty')) {
      boardState[row][col] = '_';
    } else if (cell.classList.contains('board__field--circle')) {
      boardState[row][col] = 'o';
    } else if (cell.classList.contains('board__field--cross')) {
      boardState[row][col] = 'x';
    } else {
      console.log(`Cell ${index} has no valid class assigned`);
    }
  });
  const winner = myFindWinner(boardState);
  console.log('Winner:', winner);
  console.log('Board State:', boardState);

  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload(); // Reload after user clicks OK
    }, 100);
  } else if (!boardState.flat().includes('_') && winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skoncila remizou.`);
      location.reload(); // Reload after user clicks OK
    }, 100);
  }
};

//main
playBoard.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log('Clicked on the cell.');
    placeSign(event);
    toggleCurrentPlayer();
    checkForWin();
  });
});

//prevent unwanted restart of game via restart button
const checkIfRestart = document
  .querySelector('.btn-restart')
  .addEventListener('click', (event) => {
    const result = confirm('Are you sure you want to continue?');
    if (result) {
      document.querySelector('a.btn-restart').href = 'hra.html';
    } else {
      event.preventDefault();
      console.log('User declined restart');
    }
  });
