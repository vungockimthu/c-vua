const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restart');

const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let board = [];
let selectedSquare = null;
let turn = 'white';

const whitePieces = ['♙', '♖', '♘', '♗', '♕', '♔'];
const blackPieces = ['♟', '♜', '♞', '♝', '♛', '♚'];

function initGame() {
  board = initialBoard.map(row => [...row]);
  turn = 'white';
  selectedSquare = null;
  statusElement.textContent = "Lượt đi: Trắng";
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((r + c) % 2 === 0 ? 'white-square' : 'black-square');
      square.dataset.row = r;
      square.dataset.col = c;
      square.textContent = board[r][c];

      if (selectedSquare && selectedSquare.row === r && selectedSquare.col === c) {
        square.classList.add('selected');
      }

      square.addEventListener('click', () => handleSquareClick(r, c));
      boardElement.appendChild(square);
    }
  }
}

function handleSquareClick(r, c) {
  const piece = board[r][c];

  if (selectedSquare) {
    if (selectedSquare.row !== r || selectedSquare.col !== c) {
      board[r][c] = board[selectedSquare.row][selectedSquare.col];
      board[selectedSquare.row][selectedSquare.col] = '';
      turn = turn === 'white' ? 'black' : 'white';
      statusElement.textContent = `Lượt đi: ${turn === 'white' ? 'Trắng' : 'Đen'}`;
    }
    selectedSquare = null;
  } else {
    if (piece !== '') {
      const isWhite = whitePieces.includes(piece);
      const isBlack = blackPieces.includes(piece);

      if ((turn === 'white' && isWhite) || (turn === 'black' && isBlack)) {
        selectedSquare = { row: r, col: c };
      }
    }
  }
  renderBoard();
}

restartBtn.addEventListener('click', initGame);
initGame();
