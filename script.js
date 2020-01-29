let gameBoard;
let human ='O';
let ai = 'X';
const winCond =[
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
  human = sym;
  ai = sym==='O' ? 'X' :'O';
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < gameboards.length; i++) {
    gameboards[i].addEventListener('click', turnClick, false);
  }
  if (ai === 'X') {
    turn(bestSpot(),ai);
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
    turn(square.target.id, human);
    if (!checkWin(gameBoard, human) && !checkTie())  
      turn(bestSpot(), ai);
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
  for (let [index, win] of winCond.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for (let index of winCond[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player === human ? "blue" : "red";
  }
  for (let i=0; i < gameboards.length; i++) {
    gameboards[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player === human ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return gameBoard.filter((elm, i) => i===elm);
}
  
function bestSpot(){
  return minimax(gameBoard, ai).index;
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
  
  if (checkWin(newBoard, human)) {
    return {score: -10};
  } else if (checkWin(newBoard, ai)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
  
  var moves = [];
  for (let i = 0; i < availSpots.length; i ++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    
    if (player === ai)
      move.score = minimax(newBoard, human).score;
    else
       move.score =  minimax(newBoard, ai).score;
    newBoard[availSpots[i]] = move.index;
    if ((player === ai && move.score === 10) || (player === human && move.score === -10))
      return move;
    else 
      moves.push(move);
  }
  
  let bestMove, bestScore;
  if (player === ai) {
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