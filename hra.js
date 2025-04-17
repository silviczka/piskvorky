let currentPlayer = 'circle';

const toggleCurrentPlayer = () => {
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    document.querySelector('.active-player img').src = 'podklady/cross.svg';
  } else {
    currentPlayer = 'circle';
    document.querySelector('.active-player img').src = 'podklady/circle.svg';
  }
};

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

document.querySelectorAll('#row1 .cell').forEach((button) => {
  button.addEventListener('click', () => {
    console.log('Clicked on the cell.');
    placeSign(event);
    toggleCurrentPlayer();
  });
});

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
