let gameBoard;
let huPlayer ='O';
let aiPlayer = 'X';
const winCombos =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

const gameboards = document.querySelectorAll('.gameboard');
startGame();

function symbol(sym){
  huPlayer = sym;
  aiPlayer = sym==='O' ? 'X' :'O';
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < gameboards.length; i++) {
    gameboards[i].addEventListener('click', turnClick, false);
  }
  if (aiPlayer === 'X') {
    turn(bestSpot(),aiPlayer);
  }
  document.querySelector('.symbol').style.display = "none";
}

function startGame() {
  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.endgame .text').innerText ="";
  document.querySelector('.symbol').style.display = "block";
  for (let i = 0; i < gameboards.length; i++) {
    gameboards[i].innerText = '';
    gameboards[i].style.removeProperty('background-color');
  }
}

function turnClick(square) {
  if (typeof gameBoard[square.target.id] ==='number') {
    turn(square.target.id, huPlayer);
    if (!checkWin(gameBoard, huPlayer) && !checkTie())  
      turn(bestSpot(), aiPlayer);
  }
}

function turn(squareId, player) {
  gameBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(gameBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i=0; i < gameboards.length; i++) {
    gameboards[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return gameBoard.filter((elm, i) => i===elm);
}
  
function bestSpot(){
  return minimax(gameBoard, aiPlayer).index;
}
  
function checkTie() {
  if (emptySquares().length === 0){
    for (gameboard of gameboards) {
      gameboard.style.backgroundColor = "green";
      gameboard.removeEventListener('click',turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  } 
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);
  
  if (checkWin(newBoard, huPlayer)) {
    return {score: -10};
  } else if (checkWin(newBoard, aiPlayer)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
  
  var moves = [];
  for (let i = 0; i < availSpots.length; i ++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    
    if (player === aiPlayer)
      move.score = minimax(newBoard, huPlayer).score;
    else
       move.score =  minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
      return move;
    else 
      moves.push(move);
  }
  
  let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
      bestScore = 1000;
      for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  
  return moves[bestMove];
}