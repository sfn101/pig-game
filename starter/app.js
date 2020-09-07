/* eslint-disable strict */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundScore, activePlayer;

score = [0, 0];
roundScore = [0, 0];
activePlayer = 0;

function newG() {
  score = [0, 0];
  roundScore = [0, 0];
  activePlayer = 0;
  document.querySelector('#score-0').textContent = score[0];
  document.querySelector('#score-1').textContent = score[1];
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#current-0').textContent = roundScore[0];
  document.querySelector('#current-1').textContent = roundScore[1];
}
newG();
function rScoreUP() {
  document.querySelector(`#current-${activePlayer}`).textContent =
    roundScore[activePlayer];
}

function scoreUP() {
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];
}

document.querySelector('.btn-new').addEventListener('click', newG);

document.querySelector('.btn-roll').addEventListener('click', () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  const diceDOM = document.querySelector('.dice');
  if (dice > 1) {
    roundScore[activePlayer] = roundScore[activePlayer] + dice;
    rScoreUP();
    diceDOM.style.display = 'inline';
    diceDOM.src = `dice-${dice}.png`;
  } else {
    roundScore[activePlayer] = 0;
    rScoreUP();
    diceDOM.style.display = 'inline';
    diceDOM.src = `dice-${dice}.png`;
    activePlayer = activePlayer > 0 ? 0 : 1;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  score[activePlayer] = score[activePlayer] + roundScore[activePlayer];
  scoreUP();
  roundScore[activePlayer] = 0;
  rScoreUP();
  activePlayer = activePlayer > 0 ? 0 : 1;
});
