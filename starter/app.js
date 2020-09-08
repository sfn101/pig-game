/* eslint-disable strict */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundScore, activePlayer, dicePast;

function newG() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('winner');
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  document.querySelector('#score-0').textContent = score[0];
  document.querySelector('#score-1').textContent = score[1];
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
}
newG();
function rScoreUP() {
  document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
}

function scoreUP() {
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];
}

const diceDOM = document.querySelector('.dice');
function nextP() {
  roundScore = 0;
  rScoreUP();
  console.log(roundScore);
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  activePlayer = activePlayer > 0 ? 0 : 1;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  dicePast = 0;
}

document.querySelector('.btn-new').addEventListener('click', newG);

document.querySelector('.btn-roll').addEventListener('click', () => {
  diceDOM.style.display = 'inline';
  const dice = Math.floor(Math.random() * 6) + 1;
  diceDOM.src = `dice-${dice}.png`;
  if (dice > 1) {
    roundScore += dice;
    rScoreUP();
  } else {
    nextP();
  }
  if (dice === 6 && dicePast === 6) {
    score[activePlayer] = 0;
    scoreUP();
    nextP();
  } else {
    dicePast = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  score[activePlayer] += roundScore;
  roundScore = 0;
  scoreUP();
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
  } else {
    nextP();
  }
});
